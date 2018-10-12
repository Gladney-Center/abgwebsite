<?php
/**
 * Src from Img plugin for Craft CMS
 *
 * Src from Img Twig Extension
 *
 * --snip--
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators, global variables, and
 * functions. You can even extend the parser itself with node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 * --snip--
 *
 * @author    Chris Rowe
 * @copyright Copyright (c) 2018 Chris Rowe
 * @link      http://chrisrowe.net
 * @package   SrcFromImg
 * @since     1.0.0
 */

namespace Craft;

use Twig_Extension;
use Twig_Filter_Method;

class SrcFromImgTwigExtension extends \Twig_Extension
{
    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName()
    {
        return 'SrcFromImg';
    }

    /**
     * Returns an array of Twig filters, used in Twig templates via:
     *
     *      {{ 'something' | someFilter }}
     *
     * @return array
     */
    public function getFilters()
    {
        return array(
            'srcFromImg' => new \Twig_Filter_Method($this, 'srcFromImg'),
        );
    }

    /**
     * Returns an array of Twig functions, used in Twig templates via:
     *
     *      {% set this = someFunction('something') %}
     *
     * @return array
     */
    public function getFunctions()
    {
        return array(
            'someFunction' => new \Twig_Function_Method($this, 'srcFromImg'),
        );
    }

    /**
     * Our function called via Twig; it can do anything you want
     *
      * @return string
     */
    public function srcFromImg($text = null)
    {
      preg_match('/src="([^"]+)"/', $text, $result);
      if ($result) {
        return $result[1];
      }
    }
}