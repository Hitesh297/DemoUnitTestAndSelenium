pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
               powershell('''
			   Write-Output "test"
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
                sh 'make publish'
            }
        }
    }
}