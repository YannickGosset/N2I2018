<?php

namespace AppBundle\Controller;

use AppBundle\AppBundle;
use AppBundle\Entity\Coordinates;
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

        return $this->render('default/index.html.twig', [
            'menus' => $menus
        ]);
    }

    /**
     * @Route("/modify-coordinates", name="modify-coordinates", options={"expose" = true})
     * @param Request $request
     * @return Response
     */
    public function quitEventAction(Request $request)
    {
        // On récupère les données de la requête
        $data = $request->request->all();

        $coordinates = $this->getDoctrine()
            ->getRepository('AppBundle:Coordinates')
            ->find(1);

        if ($coordinates == null) {
            $coordinates = new Coordinates();
            $coordinates->setLatitude($data['latitude']);
            $coordinates->setLatitude($data['longitude']);

            $em = $this->getDoctrine()->getManager();
            $em->persist($coordinates);
            $em->flush();
        }

        return new Response('OK');
    }
}
