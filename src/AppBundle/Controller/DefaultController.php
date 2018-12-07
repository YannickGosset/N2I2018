<?php

namespace AppBundle\Controller;

use AppBundle\AppBundle;
use AppBundle\Entity\Coordinates;
use AppBundle\Entity\DarkMode;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $menus = $this->getDoctrine()
            ->getRepository('AppBundle:Type')
            ->findBy([], ['id' => 'asc']);

        $coordinates = $this->getDoctrine()
            ->getRepository('AppBundle:Coordinates')
            ->find(1);

        if($coordinates == null){
            $coordinates = new Coordinates();
            $coordinates->setLatitude('30');
            $coordinates->setLongitude('-20');
        }

        $darkMode = $this->getDoctrine()
            ->getRepository('AppBundle:DarkMode')
            ->find(1);

        if($darkMode == null){
            $darkMode = new DarkMode();
            $darkMode->setBgColor('#777');
            $darkMode->setCardStyle('bg-light_black');
        }

        return $this->render('default/index.html.twig', [
            'menus' => $menus,
            'coordinates' => $coordinates,
            'darkMode' => $darkMode
        ]);
    }

    /**
     * @Route("/modify-coordinates", name="modify-coordinates", options={"expose" = true})
     * @param Request $request
     * @return Response
     */
    public function modifyCoordinatesAction(Request $request)
    {
        $data = $request->request->all();

        $coordinates = $this->getDoctrine()
            ->getRepository('AppBundle:Coordinates')
            ->find(1);

        $em = $this->getDoctrine()->getManager();

        if ($coordinates == null) {
            $coordinates = new Coordinates();
            $coordinates->setLatitude($data['latitude']);
            $coordinates->setLongitude($data['longitude']);
            $em->persist($coordinates);
        } else {
            $coordinates->setLatitude($data['latitude']);
            $coordinates->setLongitude($data['longitude']);
        }
        $em->flush();

        return new Response('OK');
    }

    /**
     * @Route("/get-coordinates", name="get-coordinates", options={"expose" = true})
     * @param Request $request
     * @return Response
     */
    public function getCoordinatesAction(Request $request)
    {
        $coordinates = $this->getDoctrine()
            ->getRepository('AppBundle:Coordinates')
            ->find(1);

        if ($coordinates == null) {
            return new Response(json_encode([
              'latitude' => '20',
              'longitude' => '-30'
            ], JSON_FORCE_OBJECT));
        }
        return new Response(json_encode([
            'latitude' => $coordinates->getLatitude(),
            'longitude' => $coordinates->getLongitude()
        ], JSON_FORCE_OBJECT));
    }

    /*
     * @Route("/testgraph", name="testgraphe")
     */
    public function testGraphAction(Request $request){
        return $this->render('default/testgraphe.html.twig');
    }

    /**
     * @Route("/checklist", name="checklist")
     */
    public function testChecklist(Request $request){
        return $this->render('default/checklist.html.twig');
    }
}
