Set<String> StorysIncluded = new HashSet<String>();
pipeline { 
    agent { label "master" }
    stages {
        stage('Build') { 
            steps { 
			script{
			
			try{
				
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
			   nuget restore $SolutionPath 
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:PublishProfile=CustomProfile.pubxml /p:DeployOnBuild=true /p:Configuration=release
			   ''')
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
				def CommitId = powershell(returnStdout: true, script: '''
			$Response = Invoke-WebRequest -Uri "http://localhost/TrackerService/GetPreviousDeployCommit"
			Write-Output $Response.Content
			''')
			echo "${CommitId}"
			env.PreviousDeployCommit = CommitId.trim()
			
			env.CommitMessages = powershell(returnStdout: true, script: '''
			$ComString = "$env:PreviousDeployCommit...$env:GIT_COMMIT"
			git log --pretty=format:'%s' $ComString
			''')
			
			List<String> CommitList = "${CommitMessages}".split('\n')
				echo "Commit Messages : ${CommitList}"
			
			List<String> TestCriterias = []
				for(item in CommitList)
				{
				def ComArray = item.split('-')
				if(ComArray.length > 1)
				{
				
				
				
					def storyAlpha = ComArray[-1]
					def storyNumber = ComArray[-2]
					
					
						if(ComArray[-1].isNumber())
						{
						echo "Valid Story ID"
						def storyId = "${storyAlpha}-${storyNumber}"
						StorysIncluded.add(storyId)
						TestCriterias.add("TestCategory=${storyId}")
						}
						else
						{
						echo "Invalid Story Id"
						}
					}
					else
					{
					echo "Invalid StoryId"
					}
					
					
					
					
					
					
				}
				
				echo "Stories to be tested : ${StorysIncluded}"
				
				env.TestCriteria = TestCriterias.join('|')
				echo "${TestCriteria}"
				
					try{
               powershell('''
				$TestCriteria = "'''+TestCriteria+'''"
				if ($TestCriteria)
				{
					& 'packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe' -register:Path32 -target:"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe" -targetargs:"UnitTestProject1\\bin\\Release\\UnitTestProject1.dll  --testcasefilter:$env:TestCriteria /ResultsDirectory:result /logger:trx" -output:"CodeCoverage\\OpenCover.xml" 
				}
				else
				{
					Write-Output "No Story ID found in the commits"
					& 'packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe' -register:Path32 -target:"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe" -targetargs:"UnitTestProject1\\bin\\Release\\UnitTestProject1.dll  /ResultsDirectory:result /logger:trx" -output:"CodeCoverage\\OpenCover.xml" 
				}
				
			   & 'packages\\ReportGenerator.4.0.14\\tools\\net47\\ReportGenerator.exe' -reports:"CodeCoverage\\*.xml" -targetdir:"CodeCoverage\"
			   ''')
			   
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
			script{
				def StoriesTested = StorysIncluded.join('\n')
				echo "${StoriesTested}"
               powershell('''
			   $StoriesTested = "'''+StoriesTested+'''"
			   $CommitVersion = "'''+env.GIT_COMMIT+'''"
			   
			   $params = @{"CommitVersion"=$CommitVersion;
						"Comments"=$env:CommitMessages;
						"Server"="yyy";
						"StoriesIncluded" = $StoriesTested;
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
}


	
