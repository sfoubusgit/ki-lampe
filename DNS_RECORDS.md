# DNS Configuration for ki-lampe.com

## After adding domain in Vercel, you'll need to add these DNS records:

### If using Cloudflare:

1. Go to Cloudflare Dashboard → Select `ki-lampe.com`
2. Go to **DNS** → **Records**
3. Add these records:

```
Type: A
Name: @
Content: 76.76.21.21
Proxy: Off (gray cloud - important!)
TTL: Auto

Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: Off (gray cloud - important!)
TTL: Auto
```

**Important:** Make sure the proxy is OFF (gray cloud), not ON (orange cloud)

### If using other registrars (Namecheap, IONOS, etc.):

Vercel will show you the exact DNS records after you add the domain. They will look like:

```
Type: A
Name: @ (or root domain)
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### After adding DNS records:

1. Wait 1-48 hours for DNS propagation (usually 1-2 hours)
2. Check status in Vercel: Settings → Domains
3. Status will change from "Pending" to "Valid" when ready
4. Visit https://ki-lampe.com to verify

### Verify DNS propagation:

You can check if DNS has propagated using:
- https://dnschecker.org
- Enter: `ki-lampe.com`
- Look for A record pointing to Vercel's IP


