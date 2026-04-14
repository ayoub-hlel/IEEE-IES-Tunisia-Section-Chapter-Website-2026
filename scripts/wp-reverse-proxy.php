<?php
/**
 * IEEE IES Tunisia — WordPress Reverse Proxy to Render
 * ====================================================
 * Inject this via WPCode Lite as a PHP snippet.
 *
 * Proxies all frontend traffic through WordPress to the Render-hosted
 * Next.js static site, rewriting every domain reference so visitors
 * see https://ies.ieee.tn in their browser — a complete illusion.
 *
 * WordPress admin, APIs, and static assets (/wp-content, /wp-includes)
 * are excluded and served normally.
 */

add_action('template_redirect', function() {
    $render_base = 'https://ieee-ies-tunisia-section-chapter-website.onrender.com';
    $my_domain   = 'https://ies.ieee.tn';
    $path        = $_SERVER['REQUEST_URI'] ?? '/';

    /* ── Skip WordPress internals ───────────────────────────────────── */
    $skip = ['/wp-admin', '/wp-login', '/wp-cron', '/wp-json', '/wp-content', '/wp-includes'];
    foreach ($skip as $p) {
        if (str_starts_with($path, $p)) return;
    }

    /* ── Build target URL ──────────────────────────────────────────── */
    $target_url = rtrim($render_base, '/') . $path;
    $method     = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    $args = [
        'method'      => $method,
        'timeout'     => 30,
        'redirection' => 5,
        'sslverify'   => false,
        'blocking'    => true,
        'headers'     => [
            'Accept'           => $_SERVER['HTTP_ACCEPT'] ?? 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language'  => $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? 'en',
            'Accept-Encoding'  => 'identity',
            'User-Agent'       => $_SERVER['HTTP_USER_AGENT'] ?? 'Mozilla/5.0',
            'X-Forwarded-For'  => $_SERVER['REMOTE_ADDR'] ?? '',
            'X-Real-IP'        => $_SERVER['REMOTE_ADDR'] ?? '',
            'X-Forwarded-Host' => $_SERVER['HTTP_HOST'] ?? '',
        ],
    ];

    /* ── Forward POST body if present ──────────────────────────────── */
    if ($method === 'POST' && !empty($_SERVER['CONTENT_LENGTH'])) {
        $args['body']                      = file_get_contents('php://input');
        $args['headers']['Content-Type']   = $_SERVER['CONTENT_TYPE'] ?? 'application/json';
        $args['headers']['Content-Length'] = $_SERVER['CONTENT_LENGTH'];
    }

    /* ── Fetch from Render ─────────────────────────────────────────── */
    $response = wp_remote_request($target_url, $args);

    if (is_wp_error($response)) {
        status_header(503);
        header('Content-Type: text/html; charset=UTF-8');
        header('Retry-After: 60');
        echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Loading…</title></head><body style="font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#fff;color:#1a1a1a;"><div style="text-align:center;"><h1 style="font-size:1.5rem;margin-bottom:.5rem;">Site is starting up…</h1><p style="color:#666;">Please refresh in a moment.</p></div></body></html>';
        exit;
    }

    $code         = wp_remote_retrieve_response_code($response);
    $content_type = wp_remote_retrieve_header($response, 'content-type');
    $body         = wp_remote_retrieve_body($response);

    /* ── Rewrite domain references ─────────────────────────────────── */
    $search  = [
        'https://ieee-ies-tunisia-section-chapter-website.onrender.com',
        'http://ieee-ies-tunisia-section-chapter-website.onrender.com',
        '//ieee-ies-tunisia-section-chapter-website.onrender.com',
    ];
    $replace = [
        $my_domain,
        $my_domain,
        '//ies.ieee.tn',
    ];

    // Only rewrite text-based responses (skip binary: images, fonts, etc.)
    $is_text = false;
    if (is_string($content_type)) {
        $text_types = ['text/html', 'application/json', 'text/javascript', 'application/javascript', 'text/xml', 'application/xml', 'text/css'];
        foreach ($text_types as $t) {
            if (strpos($content_type, $t) !== false) { $is_text = true; break; }
        }
    }

    if ($is_text) {
        $body = str_replace($search, $replace, $body);
    }

    /* ── Send response ─────────────────────────────────────────────── */
    status_header($code);
    header('Content-Type: ' . ($content_type ?: 'text/html; charset=UTF-8'));

    // Strip headers that shouldn't leak through the proxy
    header_remove('X-Frame-Options');
    header_remove('Content-Security-Policy');
    header_remove('X-Content-Security-Policy');
    header_remove('X-WebKit-CSP');
    header_remove('X-Powered-By');
    header_remove('X-WP-Total');
    header_remove('X-WP-TotalPages');
    header_remove('Link');

    echo $body;
    exit;
}, 1);
