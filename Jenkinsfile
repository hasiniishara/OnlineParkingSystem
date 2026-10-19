pipeline {
  agent any
   tools {
        nodejs 'node26' // Use the exact name you saved in the UI
    }
  stages{
    stage('Fix System Dependencies') {
            steps {
                echo 'Installing missing libatomic library...'
                // Update packages and install libatomic without interactive prompts
                sh 'sudo apt-get update && sudo apt-get install -y libatomic1 || apt-get update && apt-get install -y libatomic1'
            }
    }
     stage('Verify Node and NPM') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
    }
    stage("build"){
      steps{
        echo 'building the application..'
      }
    }
      stage("test"){
        steps{
          echo 'testing the application..'
        }
      }
      stage("deploy"){
        steps{
          echo 'deploying the application..'
        }
    }
  }
}
