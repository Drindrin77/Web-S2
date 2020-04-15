<?php

class ViewModel
{

    /**
     * @var string
     */
    private $viewPath;

    /**
     * @var array
     */
    private $data;

    public function __construct($viewPath, $data = null)
    {
        $this->viewPath = $viewPath;
        $this->data = $data;
    }

    public function render()
    {
        ?>

        <html>

        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                  crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                    crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                    crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                    crossorigin="anonymous"></script>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
            <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
            <script src="https://code.jquery.com/mobile/1.4.4/jquery.mobile-1.4.4.min.js"></script>


            <meta charset='utf-8'>
            <title>Feediie</title>
        </head>

        <body>
          
          <?php 
          if ($this->shouldShowHeaders()) {
            include_once 'View/Layout/header.php'; 
          }
          ?>
          <div class="pageContainer">
            <style><?php include 'View/Style/'.$this->viewPath.'.css'; ?></style>
            <?php include 'View/'.$this->viewPath.'.php' ?>
          </div>

        if ($this->shouldShowHeaders()) {
            include_once 'View/Layout/footer.php';
        }
        ?>
        </html>
        <?php
    }

    private function shouldShowHeaders()
    {
        return AuthService::isAuthenticated();
    }


}