pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   
			   $env:WORKSPACE = $env:WORKSPACE.Replace('\\', '\\\\')
			   Write-Output $env:WORKSPACE 
			   $SolutionPath = "$env:WORKSPACE\\Calculate.sln"
			   $TestPath = "C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe"
			   Write-Output "Solution Path: $SolutionPath"
			   Write-Output "Publish Profile Path : $PublishProfile"
			   nuget restore $SolutionPath -source http://localhost:8081/artifactory/api/nuget/nuget
			   & 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe' $SolutionPath /p:PublishProfile=CustomProfile.pubxml /p:DeployOnBuild=true /p:Configuration=release
			   & 'packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe' -register:user -target:"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe" -targetargs:"UnitTestProject1\\bin\\Release\\UnitTestProject1.dll /ResultsDirectory:""result/"" /logger:trx" -output:"CodeCoverage\\OpenCover.xml" -mergebyhash
			   
			   
			   ''')
			   //step([$class: 'MSTestPublisher', testResultsFile:"Testresult/*.trx", failOnError: true, keepLongStdio: true])
            }
        }
        stage('Test'){
            steps {
				script{
					try{
				String test  = "${env.WORKSPACE}"
				echo "${test}"
				//env.WORKSPACEESCAPED = test.replaceAll("\\\\", "\\\\\\\\")
				env.WORKSPACEESCAPED  = env.WORKSPACE
				echo "${WORKSPACEESCAPED}"
				bat "RunOpenCover.bat"
               powershell('''
			   Write-Output "test"
			   ''')
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
			   Write-Output "Deploy test"
			   ''')
            }
        }
    }
}