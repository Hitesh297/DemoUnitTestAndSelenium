pipeline { 
    agent { label "master" }
    stages {
        stage('Build') { 
            steps { 
			script{
			
			try{
			
				echo "${env.WORKSPACE}"
               powershell('''
				
				$env:WORKSPACE = $env:WORKSPACE.Replace('\\', '\\\\')
				Write-Output $env:WORKSPACE 
				$Results = "'C:\\Program Files (x86)\\Jenkins\\workspace\\TestPipeline\\result'"
				New-Item -Path "$env:WORKSPACE" -Name "result" -ItemType "directory"
				New-Item -Path "$env:WORKSPACE" -Name "CodeCoverage" -ItemType "directory"
								
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   $TestPath = "C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe"
			   Write-Output "Solution Path: $SolutionPath"
			   Write-Output "Publish Profile Path : $PublishProfile"
			   nuget restore $SolutionPath -source http://localhost:8081/artifactory/api/nuget/nuget
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:PublishProfile=CustomProfile.pubxml /p:DeployOnBuild=true /p:Configuration=release
			   ''')
			   
			   echo "${env.WORKSPACE}"
			   }
			   catch(Exception err)
			   {
			   throw err
			   }
			   
			   }
            }
        }
        stage('Test'){
            steps {
				script{
				env.StorysTested = ''
					try{
               bat 'C:\\Program Files (x86)\\Jenkins\\workspace\\TestPipeline\\test.ps1'
			   
			   echo " From Grrovy : ${env.StorysTested}"
			   
			   step([$class: 'MSTestPublisher', testResultsFile:"result/*.trx", failOnError: true, keepLongStdio: true])
			   publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: "CodeCoverage", reportFiles: 'index.htm', reportName: "CodeCoverage"])
				}
				catch(err)
				{
					throw err
				}
			
				}
               
            }
        }
        stage('Deploy') {
            steps {
               powershell('''
			   $CommitVersion = "'''+env.GIT_COMMIT+'''"
			   $Comments = (git log -4 --pretty=format:'%s')
			   foreach ( $item in $Comments ) { $stringComments = "$stringComments,$item" }
			   Write-Output $stringComments
			   Write-Output $env:StorysTested
			   
			   $params = @{"CommitVersion"=$CommitVersion;
						"Comments"=$stringComments;
						"Server"="yyy";
						"StoriesIncluded" = $env:StorysTested;
						}
				
				Write-Output $params|ConvertTo-Json

				$Response = Invoke-WebRequest -Uri http://localhost/BuildTrackerAPI/api/Deployment -Method POST -Body ($params|ConvertTo-Json) -ContentType "application/json"
				Write-Output $Response
				Write-Output "Deploy test"
			
			   ''')
            }
        }
    }
}