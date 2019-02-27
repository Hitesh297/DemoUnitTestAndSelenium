pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\MSBuild.exe $SolutionPath /p:Configuration=release
			   Write-Output $env:WORKSPACE
			   ''')
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