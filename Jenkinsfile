pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   Write-Output $env:WORKSPACE 
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   nuget restore $SolutionPath
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:Configuration=release
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