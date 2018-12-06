<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/testgraph", name="testgraphe")
     */
    public function testGraphAction(Request $request){
        $var = 2;
        return $this->render('default/testgraphe.html.twig');
    }

    /**
     * @Route("/checklist", name="checklist")
     */
    public function testChecklist(Request $request){
        return $this->render('default/checklist.html.twig');
    }
}
