pipeline {
  agent any
   tools {
        nodejs 'node20' // Use the exact name you saved in the UI
    }
  stages{
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
