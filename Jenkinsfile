pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   Write-Output $env:WORKSPACE 
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   Write-Output "Solution Path: $SolutionPath"
			   $PublishProfile = "$env:WORKSPACE\\Calculate\\Properties\\PublishProfiles\\CustomProfile.pubxml"
			   Write-Output "Publish Profile Path : $PublishProfile"
			   nuget restore $SolutionPath -source http://localhost:8081/artifactory/api/nuget/nuget
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:PublishProfile=$PublishProfile /p:Configuration=release
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