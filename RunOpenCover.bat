set nunitpath=C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\CommonExtensions\Microsoft\TestWindow\vstest.console.exe
set nunitpath_quotes="%nunitpath%"
set WORKSPACEPATH = "%WORKSPACEESCAPED%"


packages\OpenCover.4.7.922\tools\OpenCover.Console.exe -register:user -target:%nunitpath_quotes% "-targetargs:UnitTestProject1\bin\Release\UnitTestProject1.dll /ResultsDirectory:""Testresult"" /logger:trx" -output:CodeCoverage\OpenCover.xml -mergebyhash