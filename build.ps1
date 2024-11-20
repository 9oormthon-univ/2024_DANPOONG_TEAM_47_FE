# build.ps1
Set-Location ..

New-Item -ItemType Directory -Force -Path .\output

Copy-Item -Recurse -Force -Path .\kongju-fe\* -Destination .\output

Copy-Item -Recurse -Force -Path .\output\* -Destination .\kongju-fe