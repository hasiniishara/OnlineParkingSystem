pipeline {
  agent any
   tools {
        nodejs 'node26' // Use the exact name you saved in the UI
    }
  stages{
     stage('Verify Node and NPM') {
            steps {
                bat 'node -v'
                bat 'npm -v'
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
