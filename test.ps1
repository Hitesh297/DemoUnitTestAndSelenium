$Response = Invoke-WebRequest -Uri "http://localhost/TrackerService/GetPreviousDeployCommit"
			   $PreviousDeployCommit = $Response.Content
			   $ComString = "$PreviousDeployCommit...$env:GIT_COMMIT"
			   $Comments = (git log --pretty=format:'%s' $ComString) 
				Write-Output $PreviousDeployCommit
				Write-Output $CurrentCommit
				Write-Output "Comments : $Comments"
				
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
				$env:StorysTested = "Test Value"
				Write-Output "Stories tested : $env:StorysTested"
				
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