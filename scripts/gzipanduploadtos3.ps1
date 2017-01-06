param([string]$s3cmdpath="D:\platform\utils\s3cmd\s3cmd",[string]$s3bucket="docs.oski.io",[string]$indexdoc="index.html")

$curr = Get-location
Write-Host $curr

$op = %{'{0}\publish' -f $curr}
Write-Host $op
Set-Location $op

# Gzip compress files with extension .html, .js, .xml, .css
$files = Get-ChildItem -Recurse . -Attributes !Directory
$otherfiles = New-Object Object
$otherfiles = @()
$compressextensions = (".html",".js",".xml",".css",".json")

function ZipFiles($inFile)
{
    Add-Type -Assembly System.IO.Compression.FileSystem
	$outFile = $($inFile + ".gz")
    $input = New-Object System.IO.FileStream $inFile, ([IO.FileMode]::Open), ([IO.FileAccess]::Read), ([IO.FileShare]::Read)
 
    $buffer = New-Object byte[]($input.Length)
    $byteCount = $input.Read($buffer, 0, $input.Length)
 
    if ($byteCount -ne $input.Length)
    {
        $input.Close()
        Write-Host "Failure reading $inFile."
        exit 2
    }
    $input.Close()
 
    $output = New-Object System.IO.FileStream $outFile, ([IO.FileMode]::Create), ([IO.FileAccess]::Write), ([IO.FileShare]::None)
    $gzipStream = New-Object System.IO.Compression.GzipStream $output, ([IO.Compression.CompressionMode]::Compress)
 
    $gzipStream.Write($buffer, 0, $buffer.Length)
    $gzipStream.Close()
 
    $output.Close()
}

foreach($file in $files)
{
  if($compressextensions.Contains($file.Extension))
  {
	ZipFiles($file.Fullname)
	Remove-Item $file.FullName
	Rename-Item ($file.FullName + ".gz") $file.Name
	Write-Host "Compressing" $file.FullName
  }
  else
  {
    Write-Host $file.FullName "does not need to be compressed"
	$otherfiles += $file
  }
}

# Define expire times
$oneyear = 31557600
$onemonth = 2592000
$oneweek = 604800
$oneday = 86400
$onehour = 3600
$onedayrfc1123 = ((Get-Date).AddSeconds(86400)).ToString('r')


# Delete current deployment
#"Emptying current bucket contents"
#python $s3cmdpath -r -f del s3://$s3bucket

# Upload files to S3
$workingdir = [regex]::Escape((Get-Location).ToString()) #Escapes any special characters that may interfere with RegEx matching

foreach($file in $files)
{
  $s3path = "s3://" + $s3bucket + (($file.FullName).ToString() -replace $workingdir,"" -replace "\\","/")
  Write-Host "Uploading" $file.Name "to" $s3path
  switch($file.Extension)
  {
    ".html" 
	  {
	    python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$onehour, must-revalidate" --add-header="Content-Encoding:gzip" --mime-type="text/html; charset=utf-8" $file.FullName $s3path
		break
	  }
	".js"
      {
        python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$oneweek" --add-header="Content-Encoding:gzip" --mime-type="application/javascript" $file.FullName $s3path
		break
	  }
	".css"
	  {
	    python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$oneday" --add-header="Content-Encoding:gzip" --mime-type="text/css" $file.FullName $s3path
		break  
	  }
	".xml"
	  {
	    python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$onemonth" --add-header="Content-Encoding:gzip" --mime-type="application/xml" $file.FullName $s3path
		break	  
      }
	".md"
	  {
	    python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$oneday" --add-header="Content-Encoding:gzip" --mime-type="text/plain" $file.FullName $s3path
		break	  
    }
	".json"
	  {
	    python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$oneday" --add-header="Content-Encoding:gzip" --mime-type="application/json" $file.FullName $s3path
		break	  
    }
	".ps1"
	  {
	    break
	  }
	default
	  {
	    python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$oneday" $file.FullName $s3path
		break	  
       }
	}
}

# Replace index.html with short expire time
Write-Host "Setting short expiry time for" $indexdoc
python $s3cmdpath sync --no-progress --acl-public --no-preserve --add-header="Cache-Control:public, max-age=$oneday, must-revalidate" --add-header="Expires:$onedayrfc1123"  --add-header="Content-Encoding:gzip" --mime-type="text/html; charset=utf-8" $indexdoc s3://$s3bucket/$indexdoc

