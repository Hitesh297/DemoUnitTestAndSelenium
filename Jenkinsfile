pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   Write-Output $env:WORKSPACE 
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   Write-Output "Solution Path: $SolutionPath"
			   Write-Output "Publish Profile Path : $PublishProfile"
			   nuget restore $SolutionPath -source http://localhost:8081/artifactory/api/nuget/nuget
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:PublishProfile=CustomProfile.pubxml /p:DeployOnBuild=true /p:Configuration=release
			   & 'C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\CommonExtensions\Microsoft\TestWindow\vstest.console.exe' "UnitTestProject1\\bin\\Release\\UnitTestProject1.dll"  /ResultsDirectory:"$env:WORKSPACE\\result" /Logger:trx
			   
			   ''')
			   step([$class: 'MSTestPublisher', testResultsFile:"**/*.trx", failOnError: true, keepLongStdio: true])
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