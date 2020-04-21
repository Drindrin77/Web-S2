<?php

class ViewModel {

    private $page;
    private $title;
    private $path = '/var/www/html/src/View/';
    private $data;

    public function __construct($page, $data=null, $title='Feediie')

    {
        $this->page = $page;
        $this->title = $title;
        $this->data = $data;
    }

    public function render(){
        ?>

        <html>

          <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                    crossorigin="anonymous">
              <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
              <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                      crossorigin="anonymous"></script>
              <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                      crossorigin="anonymous"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                      crossorigin="anonymous"></script>
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
              <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>

              <style>
                <?php 
                  if(file_exists($this->path.'Style/'.$this->page.'.css')){
                    include 'Style/'.$this->page.'.css';
                  }
                ?>
              </style>


            <meta charset='utf-8'>
            <title><?= $this->title ?></title>
          </head>

          <body>
            
            <?php 
            if ($this->shouldShowHeaders()) {
              include_once 'Layout/header.php'; 
            }
            ?>
            <div class="pageContainer">
              <?php include 'Pages/'.$this->page.'.php' ?>
            </div>

            <script>
                <?php
                if(file_exists($this->path.'Script/'.$this->page.'.js')){
                    include 'Script/'.$this->page.'.js';
                }
                ?>
            </script>
            <?php
              if ($this->shouldShowHeaders()) {
                include_once 'Layout/footer.php';
              }
            ?>

          </body>
 
        </html>
    <?php
    }

    private function shouldShowHeaders()
    {
        return AuthService::isAuthenticated();
    }
}
?>