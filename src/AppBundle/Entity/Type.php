<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Type
 *
 * @ORM\Table(name="type")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TypeRepository")
 */
class Type
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
     * @var string
     *
     * @ORM\Column(name="icon", type="string", length=255)
     */
    private $icon;

    /**
     * @var string
     *
     * @ORM\Column(name="displayer_id", type="string", length=255)
     */
    private $displayerId;

    /**
     * @var string
     *
     * @ORM\Column(name="class_color", type="string", length=255)
     */
    private $classColor;

    /**
     * @var bool
     *
     * @ORM\Column(name="hasNotification", type="boolean")
     */
    private $hasNotification;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Notification", mappedBy="type")
     * @ORM\JoinColumn(nullable=true)
     */
    private $notifications;

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
     * @return Type
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
     * Set icon
     *
     * @param string $icon
     *
     * @return Type
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * Get icon
     *
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set hasNotification
     *
     * @param boolean $hasNotification
     *
     * @return Type
     */
    public function setHasNotification($hasNotification)
    {
        $this->hasNotification = $hasNotification;

        return $this;
    }

    /**
     * Get hasNotification
     *
     * @return bool
     */
    public function getHasNotification()
    {
        return $this->hasNotification;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->notifications = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add notification
     *
     * @param \AppBundle\Entity\Notification $notification
     *
     * @return Type
     */
    public function addNotification(\AppBundle\Entity\Notification $notification)
    {
        $this->notifications[] = $notification;

        return $this;
    }

    /**
     * Remove notification
     *
     * @param \AppBundle\Entity\Notification $notification
     */
    public function removeNotification(\AppBundle\Entity\Notification $notification)
    {
        $this->notifications->removeElement($notification);
    }

    /**
     * Get notifications
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getNotifications()
    {
        return $this->notifications;
    }

    /**
     * Set displayerId
     *
     * @param string $displayerId
     *
     * @return Type
     */
    public function setDisplayerId($displayerId)
    {
        $this->displayerId = $displayerId;

        return $this;
    }

    /**
     * Get displayerId
     *
     * @return string
     */
    public function getDisplayerId()
    {
        return $this->displayerId;
    }

    /**
     * Set classColor
     *
     * @param string $classColor
     *
     * @return Type
     */
    public function setClassColor($classColor)
    {
        $this->classColor = $classColor;

        return $this;
    }

    /**
     * Get classColor
     *
     * @return string
     */
    public function getClassColor()
    {
        return $this->classColor;
    }
}
