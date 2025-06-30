<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* @EasyAdmin/page/login.html.twig */
class __TwigTemplate_44017b304e03f37603c7ed52bd4eadae extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'body_class' => [$this, 'block_body_class'],
            'page_title' => [$this, 'block_page_title'],
            'head_favicon' => [$this, 'block_head_favicon'],
            'wrapper_wrapper' => [$this, 'block_wrapper_wrapper'],
            'header_logo' => [$this, 'block_header_logo'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 2
        return $this->loadTemplate(((CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 2, $this->source); })()), "hasContext", [], "any", false, false, false, 2)) ? (CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 2, $this->source); })()), "templatePath", ["layout"], "method", false, false, false, 2)) : ("@EasyAdmin/page/login_minimal.html.twig")), "@EasyAdmin/page/login.html.twig", 2);
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@EasyAdmin/page/login.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@EasyAdmin/page/login.html.twig"));

        // line 3
        $context["__internal_6726175ebf5e61c0ccea89d9548987c7"] = ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 3, $this->source); })()), "hasContext", [], "any", false, false, false, 3)) ? (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 3, $this->source); })()), "i18n", [], "any", false, false, false, 3), "translationDomain", [], "any", false, false, false, 3)) : (((array_key_exists("translation_domain", $context)) ? ((($context["translation_domain"]) ?? ("messages"))) : (""))));
        // line 2
        yield from $this->getParent($context)->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 5
    public function block_body_class($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body_class"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body_class"));

        // line 0
        yield "page-login";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        return; yield '';
    }

    // line 6
    public function block_page_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "page_title"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "page_title"));

        yield ((array_key_exists("page_title", $context)) ? ((isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 6, $this->source); })())) : (((CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 6, $this->source); })()), "hasContext", [], "any", false, false, false, 6)) ? (CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 6, $this->source); })()), "dashboardTitle", [], "any", false, false, false, 6)) : (""))));
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        return; yield '';
    }

    // line 8
    public function block_head_favicon($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "head_favicon"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "head_favicon"));

        // line 9
        yield "    ";
        if (((array_key_exists("favicon_path", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["favicon_path"]) || array_key_exists("favicon_path", $context) ? $context["favicon_path"] : (function () { throw new RuntimeError('Variable "favicon_path" does not exist.', 9, $this->source); })()), false)) : (false))) {
            // line 10
            yield "        <link rel=\"shortcut icon\" href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["favicon_path"]) || array_key_exists("favicon_path", $context) ? $context["favicon_path"] : (function () { throw new RuntimeError('Variable "favicon_path" does not exist.', 10, $this->source); })()), "html", null, true);
            yield "\">
    ";
        } else {
            // line 12
            yield "        ";
            yield from $this->yieldParentBlock("head_favicon", $context, $blocks);
            yield "
    ";
        }
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        return; yield '';
    }

    // line 16
    public function block_wrapper_wrapper($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "wrapper_wrapper"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "wrapper_wrapper"));

        // line 17
        yield "    ";
        $context["page_title"] =         $this->unwrap()->renderBlock("page_title", $context, $blocks);
        // line 18
        yield "    ";
        $context["_username_label"] = ((array_key_exists("username_label", $context)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans((isset($context["username_label"]) || array_key_exists("username_label", $context) ? $context["username_label"] : (function () { throw new RuntimeError('Variable "username_label" does not exist.', 18, $this->source); })()), [],         // line 3
(isset($context["__internal_6726175ebf5e61c0ccea89d9548987c7"]) || array_key_exists("__internal_6726175ebf5e61c0ccea89d9548987c7", $context) ? $context["__internal_6726175ebf5e61c0ccea89d9548987c7"] : (function () { throw new RuntimeError('Variable "__internal_6726175ebf5e61c0ccea89d9548987c7" does not exist.', 3, $this->source); })()))) : ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("login_page.username", [], "EasyAdminBundle")));
        // line 19
        yield "    ";
        $context["_password_label"] = ((array_key_exists("password_label", $context)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans((isset($context["password_label"]) || array_key_exists("password_label", $context) ? $context["password_label"] : (function () { throw new RuntimeError('Variable "password_label" does not exist.', 19, $this->source); })()), [],         // line 3
(isset($context["__internal_6726175ebf5e61c0ccea89d9548987c7"]) || array_key_exists("__internal_6726175ebf5e61c0ccea89d9548987c7", $context) ? $context["__internal_6726175ebf5e61c0ccea89d9548987c7"] : (function () { throw new RuntimeError('Variable "__internal_6726175ebf5e61c0ccea89d9548987c7" does not exist.', 3, $this->source); })()))) : ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("login_page.password", [], "EasyAdminBundle")));
        // line 20
        yield "    ";
        $context["_forgot_password_label"] = ((array_key_exists("forgot_password_label", $context)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans((isset($context["forgot_password_label"]) || array_key_exists("forgot_password_label", $context) ? $context["forgot_password_label"] : (function () { throw new RuntimeError('Variable "forgot_password_label" does not exist.', 20, $this->source); })()), [],         // line 3
(isset($context["__internal_6726175ebf5e61c0ccea89d9548987c7"]) || array_key_exists("__internal_6726175ebf5e61c0ccea89d9548987c7", $context) ? $context["__internal_6726175ebf5e61c0ccea89d9548987c7"] : (function () { throw new RuntimeError('Variable "__internal_6726175ebf5e61c0ccea89d9548987c7" does not exist.', 3, $this->source); })()))) : ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("login_page.forgot_password", [], "EasyAdminBundle")));
        // line 21
        yield "    ";
        $context["_remember_me_label"] = ((array_key_exists("remember_me_label", $context)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans((isset($context["remember_me_label"]) || array_key_exists("remember_me_label", $context) ? $context["remember_me_label"] : (function () { throw new RuntimeError('Variable "remember_me_label" does not exist.', 21, $this->source); })()), [],         // line 3
(isset($context["__internal_6726175ebf5e61c0ccea89d9548987c7"]) || array_key_exists("__internal_6726175ebf5e61c0ccea89d9548987c7", $context) ? $context["__internal_6726175ebf5e61c0ccea89d9548987c7"] : (function () { throw new RuntimeError('Variable "__internal_6726175ebf5e61c0ccea89d9548987c7" does not exist.', 3, $this->source); })()))) : ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("login_page.remember_me", [], "EasyAdminBundle")));
        // line 22
        yield "    ";
        $context["_sign_in_label"] = ((array_key_exists("sign_in_label", $context)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans((isset($context["sign_in_label"]) || array_key_exists("sign_in_label", $context) ? $context["sign_in_label"] : (function () { throw new RuntimeError('Variable "sign_in_label" does not exist.', 22, $this->source); })()), [],         // line 3
(isset($context["__internal_6726175ebf5e61c0ccea89d9548987c7"]) || array_key_exists("__internal_6726175ebf5e61c0ccea89d9548987c7", $context) ? $context["__internal_6726175ebf5e61c0ccea89d9548987c7"] : (function () { throw new RuntimeError('Variable "__internal_6726175ebf5e61c0ccea89d9548987c7" does not exist.', 3, $this->source); })()))) : ($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("login_page.sign_in", [], "EasyAdminBundle")));
        // line 23
        yield "
    ";
        // line 24
        yield from         $this->loadTemplate("@EasyAdmin/flash_messages.html.twig", "@EasyAdmin/page/login.html.twig", 24)->unwrap()->yield($context);
        // line 25
        yield "
    <div class=\"login-wrapper\">
        <header class=\"main-header\">
            <div id=\"header-logo\">
                ";
        // line 29
        yield from $this->unwrap()->yieldBlock('header_logo', $context, $blocks);
        // line 42
        yield "            </div>
        </header>

        <section class=\"content\">
            ";
        // line 46
        if (((array_key_exists("error", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["error"]) || array_key_exists("error", $context) ? $context["error"] : (function () { throw new RuntimeError('Variable "error" does not exist.', 46, $this->source); })()), false)) : (false))) {
            // line 47
            yield "                <div class=\"w-100 alert alert-danger rounded mb-3\">
                    ";
            // line 48
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans(CoreExtension::getAttribute($this->env, $this->source, (isset($context["error"]) || array_key_exists("error", $context) ? $context["error"] : (function () { throw new RuntimeError('Variable "error" does not exist.', 48, $this->source); })()), "messageKey", [], "any", false, false, false, 48), CoreExtension::getAttribute($this->env, $this->source, (isset($context["error"]) || array_key_exists("error", $context) ? $context["error"] : (function () { throw new RuntimeError('Variable "error" does not exist.', 48, $this->source); })()), "messageData", [], "any", false, false, false, 48), "security"), "html", null, true);
            yield "
                </div>
            ";
        }
        // line 51
        yield "
            <form method=\"post\" action=\"";
        // line 52
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("action", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["action"]) || array_key_exists("action", $context) ? $context["action"] : (function () { throw new RuntimeError('Variable "action" does not exist.', 52, $this->source); })()), "")) : ("")), "html", null, true);
        yield "\">
                ";
        // line 53
        if (((array_key_exists("csrf_token_intention", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["csrf_token_intention"]) || array_key_exists("csrf_token_intention", $context) ? $context["csrf_token_intention"] : (function () { throw new RuntimeError('Variable "csrf_token_intention" does not exist.', 53, $this->source); })()), false)) : (false))) {
            // line 54
            yield "                    <input type=\"hidden\" name=\"_csrf_token\" value=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderCsrfToken((isset($context["csrf_token_intention"]) || array_key_exists("csrf_token_intention", $context) ? $context["csrf_token_intention"] : (function () { throw new RuntimeError('Variable "csrf_token_intention" does not exist.', 54, $this->source); })())), "html", null, true);
            yield "\">
                ";
        }
        // line 56
        yield "
                <input type=\"hidden\" name=\"";
        // line 57
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("target_path_parameter", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["target_path_parameter"]) || array_key_exists("target_path_parameter", $context) ? $context["target_path_parameter"] : (function () { throw new RuntimeError('Variable "target_path_parameter" does not exist.', 57, $this->source); })()), "_target_path")) : ("_target_path")), "html", null, true);
        yield "\" value=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("target_path", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["target_path"]) || array_key_exists("target_path", $context) ? $context["target_path"] : (function () { throw new RuntimeError('Variable "target_path" does not exist.', 57, $this->source); })()), ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 57, $this->source); })()), "hasContext", [], "any", false, false, false, 57)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath(CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 57, $this->source); })()), "dashboardRouteName", [], "any", false, false, false, 57))) : ("/")))) : (((CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 57, $this->source); })()), "hasContext", [], "any", false, false, false, 57)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath(CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 57, $this->source); })()), "dashboardRouteName", [], "any", false, false, false, 57))) : ("/")))), "html", null, true);
        yield "\" />

                <div class=\"form-group\">
                    <label class=\"form-control-label required\" for=\"username\">";
        // line 60
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["_username_label"]) || array_key_exists("_username_label", $context) ? $context["_username_label"] : (function () { throw new RuntimeError('Variable "_username_label" does not exist.', 60, $this->source); })()), "html", null, true);
        yield "</label>
                    <div class=\"form-widget\">
                        <input type=\"text\" id=\"username\" name=\"";
        // line 62
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("username_parameter", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["username_parameter"]) || array_key_exists("username_parameter", $context) ? $context["username_parameter"] : (function () { throw new RuntimeError('Variable "username_parameter" does not exist.', 62, $this->source); })()), "_username")) : ("_username")), "html", null, true);
        yield "\" class=\"form-control\" value=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("last_username", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["last_username"]) || array_key_exists("last_username", $context) ? $context["last_username"] : (function () { throw new RuntimeError('Variable "last_username" does not exist.', 62, $this->source); })()), "")) : ("")), "html", null, true);
        yield "\" required autofocus autocomplete=\"username\">
                    </div>
                </div>

                <div class=\"form-group\">
                    <label class=\"form-control-label required\" for=\"password\">";
        // line 67
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["_password_label"]) || array_key_exists("_password_label", $context) ? $context["_password_label"] : (function () { throw new RuntimeError('Variable "_password_label" does not exist.', 67, $this->source); })()), "html", null, true);
        yield "</label>
                    <div class=\"form-widget\">
                        <input type=\"password\" id=\"password\" name=\"";
        // line 69
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("password_parameter", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["password_parameter"]) || array_key_exists("password_parameter", $context) ? $context["password_parameter"] : (function () { throw new RuntimeError('Variable "password_parameter" does not exist.', 69, $this->source); })()), "_password")) : ("_password")), "html", null, true);
        yield "\" class=\"form-control\" required autocomplete=\"current-password\">
                    </div>

                    ";
        // line 72
        if (((array_key_exists("forgot_password_enabled", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["forgot_password_enabled"]) || array_key_exists("forgot_password_enabled", $context) ? $context["forgot_password_enabled"] : (function () { throw new RuntimeError('Variable "forgot_password_enabled" does not exist.', 72, $this->source); })()), false)) : (false))) {
            // line 73
            yield "                        <div class=\"form-text\">
                            <a href=\"";
            // line 74
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("forgot_password_path", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["forgot_password_path"]) || array_key_exists("forgot_password_path", $context) ? $context["forgot_password_path"] : (function () { throw new RuntimeError('Variable "forgot_password_path" does not exist.', 74, $this->source); })()), "#")) : ("#")), "html", null, true);
            yield "\">";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["_forgot_password_label"]) || array_key_exists("_forgot_password_label", $context) ? $context["_forgot_password_label"] : (function () { throw new RuntimeError('Variable "_forgot_password_label" does not exist.', 74, $this->source); })()), "html", null, true);
            yield "</a>
                        </div>
                    ";
        }
        // line 77
        yield "                </div>

                ";
        // line 79
        if (((array_key_exists("remember_me_enabled", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["remember_me_enabled"]) || array_key_exists("remember_me_enabled", $context) ? $context["remember_me_enabled"] : (function () { throw new RuntimeError('Variable "remember_me_enabled" does not exist.', 79, $this->source); })()), false)) : (false))) {
            // line 80
            yield "                    <div class=\"form-group\">
                        <input class=\"form-check-input\" type=\"checkbox\" id=\"remember_me\" name=\"";
            // line 81
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("remember_me_parameter", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["remember_me_parameter"]) || array_key_exists("remember_me_parameter", $context) ? $context["remember_me_parameter"] : (function () { throw new RuntimeError('Variable "remember_me_parameter" does not exist.', 81, $this->source); })()), "_remember_me")) : ("_remember_me")), "html", null, true);
            yield "\" ";
            yield ((((array_key_exists("remember_me_checked", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["remember_me_checked"]) || array_key_exists("remember_me_checked", $context) ? $context["remember_me_checked"] : (function () { throw new RuntimeError('Variable "remember_me_checked" does not exist.', 81, $this->source); })()), false)) : (false))) ? ("checked") : (""));
            yield ">
                        <label class=\"form-check-label\" for=\"remember_me\">
                            ";
            // line 83
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["_remember_me_label"]) || array_key_exists("_remember_me_label", $context) ? $context["_remember_me_label"] : (function () { throw new RuntimeError('Variable "_remember_me_label" does not exist.', 83, $this->source); })()), "html", null, true);
            yield "
                        </label>
                    </div>
                ";
        }
        // line 87
        yield "
                <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
        // line 88
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["_sign_in_label"]) || array_key_exists("_sign_in_label", $context) ? $context["_sign_in_label"] : (function () { throw new RuntimeError('Variable "_sign_in_label" does not exist.', 88, $this->source); })()), "html", null, true);
        yield "</button>
            </form>

            <script src=\"";
        // line 91
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("login.js", Twig\Extension\CoreExtension::constant("EasyCorp\\Bundle\\EasyAdminBundle\\Asset\\AssetPackage::PACKAGE_NAME")), "html", null, true);
        yield "\"></script>
        </section>
    </div>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        return; yield '';
    }

    // line 29
    public function block_header_logo($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "header_logo"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "header_logo"));

        // line 30
        yield "                    ";
        if ((isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 30, $this->source); })())) {
            // line 31
            yield "                        ";
            if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 31, $this->source); })()), "hasContext", [], "any", false, false, false, 31)) {
                // line 32
                yield "                            <a class=\"logo ";
                yield (((Twig\Extension\CoreExtension::length($this->env->getCharset(), (isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 32, $this->source); })())) > 14)) ? ("logo-long") : (""));
                yield "\" title=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::striptags((isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 32, $this->source); })())), "html", null, true);
                yield "\" href=\"";
                yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath(CoreExtension::getAttribute($this->env, $this->source, (isset($context["ea"]) || array_key_exists("ea", $context) ? $context["ea"] : (function () { throw new RuntimeError('Variable "ea" does not exist.', 32, $this->source); })()), "dashboardRouteName", [], "any", false, false, false, 32));
                yield "\">
                                ";
                // line 33
                yield (isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 33, $this->source); })());
                yield "
                            </a>
                        ";
            } else {
                // line 36
                yield "                            <div class=\"logo ";
                yield (((Twig\Extension\CoreExtension::length($this->env->getCharset(), (isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 36, $this->source); })())) > 14)) ? ("logo-long") : (""));
                yield "\">
                                ";
                // line 37
                yield (isset($context["page_title"]) || array_key_exists("page_title", $context) ? $context["page_title"] : (function () { throw new RuntimeError('Variable "page_title" does not exist.', 37, $this->source); })());
                yield "
                            </div>
                        ";
            }
            // line 40
            yield "                    ";
        }
        // line 41
        yield "                ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@EasyAdmin/page/login.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  360 => 41,  357 => 40,  351 => 37,  346 => 36,  340 => 33,  331 => 32,  328 => 31,  325 => 30,  315 => 29,  300 => 91,  294 => 88,  291 => 87,  284 => 83,  277 => 81,  274 => 80,  272 => 79,  268 => 77,  260 => 74,  257 => 73,  255 => 72,  249 => 69,  244 => 67,  234 => 62,  229 => 60,  221 => 57,  218 => 56,  212 => 54,  210 => 53,  206 => 52,  203 => 51,  197 => 48,  194 => 47,  192 => 46,  186 => 42,  184 => 29,  178 => 25,  176 => 24,  173 => 23,  171 => 3,  169 => 22,  167 => 3,  165 => 21,  163 => 3,  161 => 20,  159 => 3,  157 => 19,  155 => 3,  153 => 18,  150 => 17,  140 => 16,  125 => 12,  119 => 10,  116 => 9,  106 => 8,  86 => 6,  75 => 0,  65 => 5,  55 => 2,  53 => 3,  40 => 2,);
    }

    public function getSourceContext()
    {
        return new Source("{# @var ea \\EasyCorp\\Bundle\\EasyAdminBundle\\Provider\\AdminContextProvider #}
{% extends ea.hasContext ? ea.templatePath('layout') : '@EasyAdmin/page/login_minimal.html.twig' %}
{% trans_default_domain ea.hasContext ? ea.i18n.translationDomain : (translation_domain is defined ? translation_domain ?? 'messages') %}

{% block body_class 'page-login' %}
{% block page_title %}{{ page_title is defined ? page_title|raw : (ea.hasContext ? ea.dashboardTitle|raw : '') }}{% endblock %}

{% block head_favicon %}
    {% if favicon_path|default(false) %}
        <link rel=\"shortcut icon\" href=\"{{ favicon_path }}\">
    {% else %}
        {{ parent() }}
    {% endif %}
{% endblock %}

{% block wrapper_wrapper %}
    {% set page_title = block('page_title') %}
    {% set _username_label = username_label is defined ? username_label|trans : 'login_page.username'|trans({}, 'EasyAdminBundle') %}
    {% set _password_label = password_label is defined ? password_label|trans : 'login_page.password'|trans({}, 'EasyAdminBundle') %}
    {% set _forgot_password_label = forgot_password_label is defined ? forgot_password_label|trans : 'login_page.forgot_password'|trans({}, 'EasyAdminBundle') %}
    {% set _remember_me_label = remember_me_label is defined ? remember_me_label|trans : 'login_page.remember_me'|trans({}, 'EasyAdminBundle') %}
    {% set _sign_in_label = sign_in_label is defined ? sign_in_label|trans : 'login_page.sign_in'|trans({}, 'EasyAdminBundle') %}

    {% include '@EasyAdmin/flash_messages.html.twig' %}

    <div class=\"login-wrapper\">
        <header class=\"main-header\">
            <div id=\"header-logo\">
                {% block header_logo %}
                    {% if page_title %}
                        {% if ea.hasContext %}
                            <a class=\"logo {{ page_title|length > 14 ? 'logo-long' }}\" title=\"{{ page_title|striptags }}\" href=\"{{ path(ea.dashboardRouteName) }}\">
                                {{ page_title|raw }}
                            </a>
                        {% else %}
                            <div class=\"logo {{ page_title|length > 14 ? 'logo-long' }}\">
                                {{ page_title|raw }}
                            </div>
                        {% endif %}
                    {% endif %}
                {% endblock header_logo %}
            </div>
        </header>

        <section class=\"content\">
            {% if error|default(false) %}
                <div class=\"w-100 alert alert-danger rounded mb-3\">
                    {{ error.messageKey|trans(error.messageData, 'security') }}
                </div>
            {% endif %}

            <form method=\"post\" action=\"{{ action|default('') }}\">
                {% if csrf_token_intention|default(false) %}
                    <input type=\"hidden\" name=\"_csrf_token\" value=\"{{ csrf_token(csrf_token_intention) }}\">
                {% endif %}

                <input type=\"hidden\" name=\"{{ target_path_parameter|default('_target_path') }}\" value=\"{{ target_path|default(ea.hasContext ? path(ea.dashboardRouteName) : '/') }}\" />

                <div class=\"form-group\">
                    <label class=\"form-control-label required\" for=\"username\">{{ _username_label }}</label>
                    <div class=\"form-widget\">
                        <input type=\"text\" id=\"username\" name=\"{{ username_parameter|default('_username') }}\" class=\"form-control\" value=\"{{ last_username|default('') }}\" required autofocus autocomplete=\"username\">
                    </div>
                </div>

                <div class=\"form-group\">
                    <label class=\"form-control-label required\" for=\"password\">{{ _password_label }}</label>
                    <div class=\"form-widget\">
                        <input type=\"password\" id=\"password\" name=\"{{ password_parameter|default('_password') }}\" class=\"form-control\" required autocomplete=\"current-password\">
                    </div>

                    {% if forgot_password_enabled|default(false) %}
                        <div class=\"form-text\">
                            <a href=\"{{ forgot_password_path|default('#') }}\">{{ _forgot_password_label }}</a>
                        </div>
                    {% endif %}
                </div>

                {% if remember_me_enabled|default(false) %}
                    <div class=\"form-group\">
                        <input class=\"form-check-input\" type=\"checkbox\" id=\"remember_me\" name=\"{{ remember_me_parameter|default('_remember_me') }}\" {{ remember_me_checked|default(false) ? 'checked' }}>
                        <label class=\"form-check-label\" for=\"remember_me\">
                            {{ _remember_me_label }}
                        </label>
                    </div>
                {% endif %}

                <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">{{ _sign_in_label }}</button>
            </form>

            <script src=\"{{ asset('login.js', constant('EasyCorp\\\\Bundle\\\\EasyAdminBundle\\\\Asset\\\\AssetPackage::PACKAGE_NAME')) }}\"></script>
        </section>
    </div>
{% endblock %}
", "@EasyAdmin/page/login.html.twig", "C:\\wamp64\\www\\EXAM-CDA\\MayRent\\back\\vendor\\easycorp\\easyadmin-bundle\\templates\\page\\login.html.twig");
    }
}
