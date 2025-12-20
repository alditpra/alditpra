# Cache Configuration

## Current Settings

### ISR (Incremental Static Regeneration)
- **Duration**: 5 minutes (300 seconds)
- **Rationale**: Balance between performance and data freshness
- **User Requirement**: Updates from Google Spreadsheet should appear within 5 minutes

### Data Fetching Cache
- **Cache Duration**: 5 minutes
- **Stale-While-Revalidate**: 10 minutes
- **Header**: `Cache-Control: public, max-age=300, stale-while-revalidate=600`

## How It Works

1. **First Request**: Data is fetched from Google Sheets and cached
2. **Subsequent Requests (0-5 min)**: Served from cache (instant)
3. **After 5 Minutes**: Cache expires, next request triggers refresh
4. **Stale Period (5-15 min)**: Serves stale data while revalidating in background

## Benefits

✅ **Fresh Data**: Updates visible within 5 minutes maximum
✅ **Good Performance**: Still maintains caching for performance
✅ **Reliability**: Stale-while-revalidate ensures no downtime during refresh
✅ **Reduced API Calls**: Prevents hammering Google Sheets API

## Update Workflow

When you update your Google Spreadsheet:

1. **Immediate**: Changes saved in Google Sheets
2. **0-5 minutes**: Old data still shown (cached)
3. **At 5 minutes**: Cache expires
4. **Next request**: Fetches fresh data from Google Sheets
5. **Result**: New data visible to users

## Performance Impact

Compared to 15-minute cache:
- **Data Freshness**: ⬆️ 3x faster updates (5min vs 15min)
- **API Calls**: ⬆️ 3x more frequent (acceptable load)
- **PageSpeed Score**: ⬇️ Minor impact (~1-2 points potential)
- **User Experience**: ⬆️ Better (fresher content)

**Conclusion**: 5-minute cache provides good balance for your use case.

## Alternative: Manual Cache Purge

If you need **instant** updates after spreadsheet changes:

### Option 1: Vercel Revalidation API
```bash
# Trigger immediate revalidation
curl -X POST https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET
```

### Option 2: Vercel Dashboard
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" to force complete refresh

### Option 3: URL-based Revalidation
Visit special URL to trigger cache refresh (if implemented)

---

**Current configuration prioritizes data freshness while maintaining good performance.**
