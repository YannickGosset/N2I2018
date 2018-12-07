<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DarkMode
 *
 * @ORM\Table(name="dark_mode")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DarkModeRepository")
 */
class DarkMode
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
     * @ORM\Column(name="bgColor", type="string", length=255)
     */
    private $bgColor;

    /**
     * @var string
     *
     * @ORM\Column(name="cardStyle", type="string", length=255)
     */
    private $cardStyle;


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
     * Set bgColor
     *
     * @param string $bgColor
     *
     * @return DarkMode
     */
    public function setBgColor($bgColor)
    {
        $this->bgColor = $bgColor;

        return $this;
    }

    /**
     * Get bgColor
     *
     * @return string
     */
    public function getBgColor()
    {
        return $this->bgColor;
    }

    /**
     * Set cardStyle
     *
     * @param string $cardStyle
     *
     * @return DarkMode
     */
    public function setCardStyle($cardStyle)
    {
        $this->cardStyle = $cardStyle;

        return $this;
    }

    /**
     * Get cardStyle
     *
     * @return string
     */
    public function getCardStyle()
    {
        return $this->cardStyle;
    }
}
