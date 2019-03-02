set nunitpath=C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\CommonExtensions\Microsoft\TestWindow\vstest.console.exe
set nunitpath_quotes="%nunitpath%"

%WORKSPACEESCAPED%\\packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe -register:user -target:%nunitpath_quotes% "-targetargs:%WORKSPACEESCAPED%\UnitTestProject1\bin\Release\UnitTestProject1.dll /ResultsDirectory:""c:\\Tools\\result"" /logger:trx" -output:c:\\Tools\\OpenCover.xml -mergebyhash