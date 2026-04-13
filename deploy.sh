#!/bin/bash
# ============================================================================
# Deploy the IEEE IES Tunisia static site to the production server
# ============================================================================
# Usage: ./deploy.sh
#
# Prerequisites:
#   - SSH access to the production server
#   - rsync installed
#   - Run `npm run build` first
#
# Before first deploy:
#   1. Edit the REMOTE_USER, REMOTE_HOST, and REMOTE_PATH below
#   2. Ensure your DNS record for ies.ieee.tn points to your server IP
#   3. Install and configure Apache (see apache-vhost.conf)
#   4. Set up SSL certificate (Let's Encrypt recommended)
# ============================================================================

set -e

# ─── Configuration ───────────────────────────────────────────────────────────
# TODO: Update these values for your server!
REMOTE_USER="your-user"
REMOTE_HOST="your-server-ip"
REMOTE_PATH="/var/www/ies.ieee.tn"
LOCAL_PATH="./out"  # Next.js static export directory
# ─────────────────────────────────────────────────────────────────────────────

if [ ! -d "$LOCAL_PATH" ]; then
    echo "Error: Build output directory '$LOCAL_PATH' not found."
    echo "Run 'npm run build' first."
    exit 1
fi

echo "============================================"
echo " IEEE IES Tunisia - Deployment"
echo "============================================"
echo ""
echo "Deploying to: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
echo "From:         $LOCAL_PATH/"
echo ""
read -p "Continue? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "Syncing files..."

# Sync files to server (preserves permissions, deletes removed files)
rsync -avz --delete \
    -e "ssh -p 22" \
    "$LOCAL_PATH/" \
    "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

echo ""
echo "✓ Deployed successfully!"
echo ""
echo "Verify your site: https://ies.ieee.tn/"
echo ""
echo "Post-deployment checklist:"
echo "  □ DNS: ies.ieee.tn A record → $REMOTE_HOST"
echo "  □ SSL:  sudo certbot --apache -d ies.ieee.tn"
echo "  □ Apache config: sudo cp apache-vhost.conf /etc/apache2/sites-available/ies.ieee.tn.conf"
echo "  □ Enable site: sudo a2ensite ies.ieee.tn.conf"
echo "  □ Enable modules: sudo a2enmod ssl deflate expires headers rewrite"
echo "  □ Restart: sudo systemctl restart apache2"
