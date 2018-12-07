<?php

namespace AppBundle\Controller;

use AppBundle\AppBundle;
use AppBundle\Entity\Coordinates;
use AppBundle\Entity\DarkMode;
use AppBundle\Entity\ElementListe;
use AppBundle\Entity\Liste;
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

        $em = $this->getDoctrine()->getManager();
        $lists = $em->getRepository('AppBundle:Liste')->findAll();
        $elements = $em->getRepository('AppBundle:ElementListe')->findAll();

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
            'darkMode' => $darkMode,
            'listes' => $lists,
            'elements' => $elements
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

    /**
     * @Route("/addListe", name="add-checklist", options={"expose" = true})
     */
    public function addChecklistAction(Request $request){
        $name = $request->request->get('name');
        $em = $this->getDoctrine()->getManager();
        $liste = new Liste();
        $liste->setName($name);
        $em->persist($liste);
        $em->flush();
        return new Response('Test');
    }

    /**
     * @Route("/addListElement", name="add-element", options={"expose" = true})
     */
    public function addChecklistElementAction(Request $request){
        $name = $request->request->get('name');
        $list = $request->request->get('list');
        $em = $this->getDoctrine()->getManager();
        $listElement = new ElementListe();
        $listElement->setName($name);
        $listElement->setDisplayed(true);
        $listElement->setChecked(false);
        $listElement->setListe($this->getDoctrine()->getManager()->getRepository('AppBundle:Liste')->find($list));
        $em->persist($listElement);
        $em->flush();
        return new Response('Test');
    }

    /**
     * @Route("/removeListElement", name="remove-display", options={"expose" = true})
     */
    public function removeElementDisplayAction(Request $request){
        $id = $request->request->get('element');
        $em = $this->getDoctrine()->getManager();
        $listElement = $em->getRepository('AppBundle:ElementListe')->find($id);
        $listElement->setDisplayed(false);
        $em->persist($listElement);
        $em->flush();
        return new Response('Test');
    }

    /**
     * @Route("/checkListElement", name="check", options={"expose" = true})
     */
    public function checkElementAction(Request $request){
        $id = $request->request->get('element');
        $em = $this->getDoctrine()->getManager();
        $listElement = $em->getRepository('AppBundle:ElementListe')->find($id);
        if($listElement->getChecked()){ $listElement->setChecked(false);}
        else{$listElement->setChecked(true);}
        $em->persist($listElement);
        $em->flush();
        return new Response('Test');
    }
}
