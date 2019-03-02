pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   Write-Output $env:WORKSPACE 
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   $TestPath = "C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe"
			   Write-Output "Solution Path: $SolutionPath"
			   Write-Output "Publish Profile Path : $PublishProfile"
			   nuget restore $SolutionPath -source http://localhost:8081/artifactory/api/nuget/nuget
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:PublishProfile=CustomProfile.pubxml /p:DeployOnBuild=true /p:Configuration=release
			   & "$env:WORKSPACE\\packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe" -register:user "-target:C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe" -targetargs:"$env:WORKSPACE\\UnitTestProject1\\bin\\Release\\UnitTestProject1.dll /ResultsDirectory:""$env:WORKSPACE\\Testresult"" /logger:trx" -output:"$env:WORKSPACE\\CodeCoverage\\OpenCover.xml" -mergebyhash
			   
			   
			   ''')
			   step([$class: 'MSTestPublisher', testResultsFile:"Testresult/*.trx", failOnError: true, keepLongStdio: true])
            }
        }
        stage('Test'){
            steps {
               powershell('''
			   Write-Output "test"
			   ''')
               
            }
        }
        stage('Deploy') {
            steps {
               powershell('''
			   Write-Output "Deploy test"
			   ''')
            }
        }
    }
}