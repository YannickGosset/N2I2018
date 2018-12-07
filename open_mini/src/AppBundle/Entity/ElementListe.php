<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ElementListe
 *
 * @ORM\Table(name="element_liste")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ElementListeRepository")
 */
class ElementListe
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var bool
     *
     * @ORM\Column(name="checked", type="boolean")
     */
    private $checked;

    /**
     * @var bool
     *
     * @ORM\Column(name="displayed", type="boolean")
     */
    private $displayed;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Liste", inversedBy="elements")
     *
     * @ORM\JoinColumn(nullable=false)
     */
    private $liste;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return ElementListe
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set checked
     *
     * @param boolean $checked
     *
     * @return ElementListe
     */
    public function setChecked($checked)
    {
        $this->checked = $checked;

        return $this;
    }

    /**
     * Get checked
     *
     * @return bool
     */
    public function getChecked()
    {
        return $this->checked;
    }

    /**
     * Set displayed
     *
     * @param boolean $displayed
     *
     * @return ElementListe
     */
    public function setDisplayed($displayed)
    {
        $this->displayed = $displayed;

        return $this;
    }

    /**
     * Get displayed
     *
     * @return bool
     */
    public function getDisplayed()
    {
        return $this->displayed;
    }
}

