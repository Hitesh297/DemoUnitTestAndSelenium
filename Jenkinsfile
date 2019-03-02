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
			   & 'packages\\OpenCover.4.7.922\\tools\\OpenCover.Console.exe' -register:user -filter:+[Business]* -target:"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe" -targetargs:"UnitTestProject1\\bin\\Release\\UnitTestProject1.dll /noshadow /ResultsDirectory:""result"" /logger:trx" -output:"CodeCoverage\\OpenCover.xml" 
			   & 'packages\\ReportGenerator.4.0.14\\tools\\net47\\ReportGenerator.exe' -reports:"CodeCoverage\\*.xml" -targetdir:"CodeCoverage\"
			   
			   ''')
			   step([$class: 'MSTestPublisher', testResultsFile:"result/*.trx", failOnError: true, keepLongStdio: true])
			   publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: "CodeCoverage", reportFiles: 'index.htm', reportName: "CodeCoverage"])
            }
        }
        stage('Test'){
            steps {
				script{
					try{
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