pipeline { 
    agent any 
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
			   nuget restore $SolutionPath -source http://localhost:8081/artifactory/api/nuget/nuget
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
					try{
               powershell('''
			   $Comments = (git log -4 --pretty=format:'%s') 
				
				foreach ( $item in $Comments ) {
					$storyID = $item.Split('/')[-1]
					
					$storyNumber = $storyID.Split('-')[1]
					$IsNumber = [System.Int32]::TryParse($storyNumber, [ref]0)
				
					if($IsNumber){
					$filterCriteria = "$filterCriteria|TestCategory=$storyID"
					$env:StorysTested = "$env:StorysTested | $storyID"
					}
					else
					{
					Write-Output "$item not a valid story id"
					}
				}
				
				if ($filterCriteria)
				{
					$filterCriteria = $filterCriteria.TrimStart("|")
					& 'packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe' -register:Path32 -target:"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe" -targetargs:"UnitTestProject1\\bin\\Release\\UnitTestProject1.dll  --testcasefilter:$filterCriteria /ResultsDirectory:result /logger:trx" -output:"CodeCoverage\\OpenCover.xml" 
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
               powershell('''
			   $CommitVersion = "'''+env.GIT_COMMIT+'''"
			   $Comments = (git log -4 --pretty=format:'%s')
			   foreach ( $item in $Comments ) { $stringComments = "$stringComments,$item" }
			   Write-Output $stringComments
			   
			   $params = @{"CommitVersion"=$CommitVersion;
						"Comments"=$stringComments;
						"Server"="yyy";
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