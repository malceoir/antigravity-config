# Master Audit: Google Sheets Version History Row Edits Analysis

**Date of Analysis:** September 1, 2026  
**Auditor:** Prism & Absolution Gatekeeper  
**Date Range Covered:** August 27, 2026 down to July 10, 2026  

---

## 1. Executive Summary & Master Metrics

A complete, frame-by-frame computer vision and manual verification audit was conducted across 7 Google Sheets Version History video recordings (`trim1.mp4`, `trim2.mp4`, `trim3.mp4`, `Recording 2026-09-01 101547.mp4`, `Recording 2026-09-01 050645.mp4`, `Downloads/1.mp4`, and `Mobile Devices/1000014215.mp4`).

### **Master Totals**
- **Total Recorded Version Click Sessions:** `76 sessions`
- **Deduplicated Unique Edit Blocks:** `58 distinct edit blocks`
- **Master Gross Edits Sum:** `3,135 raw edits`
- **Deduplicated Edit Block Sum:** `2,475 edits`
- **Master Net Unique Rows Modified (G-Set CRDT Set Union):** `1,671 unique rows`

---

## 2. Invariants & Calculation Methodology

1. **Cell Highlight Detection:** Google Sheets Version History highlights modified cells in light green (`#6FD4B8`).
2. **Formula:** `Edits = (Ending Row - Starting Row) + 1`.
3. **Banner Precision:** Gray collapsed banners (e.g., `810 rows not modified`) provide 100% mathematical certainty for start and end row numbers.
4. **Layout Shift & Duplicate Accounting:** 
   - **Gross Edits:** Measures raw edit session totals as clicked in the Version History sidebar.
   - **Net Unique Rows:** Calculates the exact set union of row indices modified (`len(set.union(*row_ranges))`), ensuring rows modified multiple times across versions are counted exactly once.

---

## 3. Deduplicated Unique Edits List (58 Edit Blocks)

Below is the collapsed, deduplicated list of unique edit blocks (removing redundant consecutive clicks on identical row ranges):

```text
August 27, 2026 2:14 PM: Start Row 4037 - End Row 4049 (13 edits)
August 18, 2026 12:49 PM: Start Row 2658 - End Row 2670 (13 edits)
August 17, 2026 4:42 PM: Start Row 2658 - End Row 2670 (13 edits)
August 17, 2026 1:34 PM: Start Row 2582 - End Row 2590 (9 edits)
August 16, 2026 7:36 PM: Start Row 2572 - End Row 2579 (8 edits)
August 16, 2026 6:14 PM: Start Row 3904 - End Row 3912 (9 edits)
August 15, 2026 8:25 PM: Start Row 3651 - End Row 3664 (14 edits)
August 15, 2026 7:58 PM: Start Row 3781 - End Row 3793 (13 edits)
August 15, 2026 4:38 PM: Start Row 3581 - End Row 3593 (13 edits)
August 15, 2026 1:47 PM: Start Row 2316 - End Row 2328 (13 edits)
August 15, 2026 11:09 AM: Start Row 2282 - End Row 2292 (11 edits)
August 14, 2026 7:14 PM: Start Row 2282 - End Row 2292 (11 edits)
August 14, 2026 4:18 PM: Start Row 2191 - End Row 2204 (14 edits)
August 14, 2026 1:38 PM: Start Row 2097 - End Row 2110 (14 edits)
August 13, 2026 7:24 PM: Start Row 3248 - End Row 3260 (13 edits)
August 13, 2026 7:24 PM: Start Row 3394 - End Row 3404 (11 edits)
August 13, 2026 3:35 PM: Start Row 1620 - End Row 1632 (13 edits)
August 13, 2026 3:35 PM: Start Row 1781 - End Row 1791 (11 edits)
August 12, 2026 9:01 PM: Start Row 1487 - End Row 1499 (13 edits)
August 12, 2026 7:48 PM: Start Row 3228 - End Row 3240 (13 edits)
August 12, 2026 3:14 PM: Start Row 3171 - End Row 3181 (11 edits)
August 11, 2026 9:16 PM: Start Row 3121 - End Row 3131 (11 edits)
August 11, 2026 2:17 PM: Start Row 3032 - End Row 3042 (11 edits)
August 10, 2026 6:21 PM: Start Row 3121 - End Row 3131 (11 edits)
August 10, 2026 4:51 PM: Start Row 3032 - End Row 3042 (11 edits)
August 10, 2026 3:30 PM: Start Row 1001 - End Row 1013 (13 edits)
August 10, 2026 3:30 PM: Start Row 1160 - End Row 1172 (13 edits)
August 10, 2026 12:28 PM: Start Row 784 - End Row 791 (8 edits)
August 10, 2026 12:28 PM: Start Row 933 - End Row 943 (11 edits)
August 10, 2026 11:14 AM: Start Row 3230 - End Row 3243 (14 edits)
August 9, 2026 7:51 PM: Start Row 2807 - End Row 2819 (13 edits)
July 30, 2026 9:24 PM: Start Row 2952 - End Row 2964 (13 edits)
July 29, 2026 1:22 PM: Start Row 738 - End Row 750 (13 edits)
July 28, 2026 6:05 PM: Start Row 715 - End Row 728 (14 edits)
July 28, 2026 1:14 PM: Start Row 2746 - End Row 2756 (11 edits)
July 27, 2026 5:41 PM: Start Row 2671 - End Row 2680 (10 edits)
July 26, 2026 3:10 PM: Start Row 1121 - End Row 1133 (13 edits)
July 25, 2026 7:45 PM: Start Row 1121 - End Row 1133 (13 edits)
July 24, 2026 6:19 PM: Start Row 2582 - End Row 2590 (9 edits)
July 23, 2026 4:32 PM: Start Row 2572 - End Row 2579 (8 edits)
July 22, 2026 8:10 PM: Start Row 1487 - End Row 1499 (13 edits)
July 21, 2026 2:45 PM: Start Row 1001 - End Row 1172 (172 edits)
July 20, 2026 7:18 PM: Start Row 1 - End Row 1370 (1370 edits)
July 18, 2026 8:52 PM: Start Row 812 - End Row 828 (17 edits)
July 17, 2026 3:32 PM: Start Row 956 - End Row 968 (13 edits)
July 17, 2026 11:20 AM: Start Row 1116 - End Row 1148 (33 edits)
July 16, 2026 5:23 PM: Start Row 956 - End Row 968 (13 edits)
July 16, 2026 3:50 PM: Start Row 789 - End Row 810 (22 edits)
July 16, 2026 11:57 AM: Start Row 789 - End Row 801 (13 edits)
July 15, 2026 7:43 PM: Start Row 789 - End Row 801 (13 edits)
July 15, 2026 12:31 PM: Start Row 566 - End Row 578 (13 edits)
July 14, 2026 6:45 PM: Start Row 566 - End Row 578 (13 edits)
July 13, 2026 11:05 PM: Start Row 472 - End Row 503 (32 edits)
July 13, 2026 11:28 AM: Start Row 368 - End Row 381 (14 edits)
July 12, 2026 5:17 PM: Start Row 368 - End Row 381 (14 edits)
July 11, 2026 4:59 PM: Start Row 212 - End Row 224 (13 edits)
July 10, 2026 7:47 PM: Start Row 212 - End Row 231 (20 edits)
July 10, 2026 1:27 PM: Start Row 2 - End Row 205 (204 edits)
```

---

## 4. Full 76-Session Raw Click Audit List

```text
August 27, 2026 2:14 PM: Start Row 4037 - End Row 4049 (13 edits)
August 18, 2026 12:49 PM: Start Row 2658 - End Row 2670 (13 edits)
August 17, 2026 4:42 PM: Start Row 2658 - End Row 2670 (13 edits)
August 17, 2026 1:34 PM: Start Row 2582 - End Row 2590 (9 edits)
August 16, 2026 7:36 PM: Start Row 2572 - End Row 2579 (8 edits)
August 16, 2026 7:24 PM: Start Row 2572 - End Row 2579 (8 edits)
August 16, 2026 6:14 PM: Start Row 3904 - End Row 3912 (9 edits)
August 15, 2026 8:25 PM: Start Row 3651 - End Row 3664 (14 edits)
August 15, 2026 7:58 PM: Start Row 3781 - End Row 3793 (13 edits)
August 15, 2026 4:38 PM: Start Row 3581 - End Row 3593 (13 edits)
August 15, 2026 1:47 PM: Start Row 2316 - End Row 2328 (13 edits)
August 15, 2026 11:09 AM: Start Row 2282 - End Row 2292 (11 edits)
August 14, 2026 7:14 PM: Start Row 2282 - End Row 2292 (11 edits)
August 14, 2026 4:18 PM: Start Row 2191 - End Row 2204 (14 edits)
August 14, 2026 1:38 PM: Start Row 2097 - End Row 2110 (14 edits)
August 13, 2026 7:24 PM: Start Row 3248 - End Row 3260 (13 edits)
August 13, 2026 7:24 PM: Start Row 3394 - End Row 3404 (11 edits)
August 13, 2026 3:35 PM: Start Row 1620 - End Row 1632 (13 edits)
August 13, 2026 3:35 PM: Start Row 1781 - End Row 1791 (11 edits)
August 12, 2026 9:01 PM: Start Row 1487 - End Row 1499 (13 edits)
August 12, 2026 7:48 PM: Start Row 3228 - End Row 3240 (13 edits)
August 12, 2026 4:59 PM: Start Row 3228 - End Row 3240 (13 edits)
August 12, 2026 3:14 PM: Start Row 3171 - End Row 3181 (11 edits)
August 11, 2026 9:16 PM: Start Row 3121 - End Row 3131 (11 edits)
August 11, 2026 2:17 PM: Start Row 3032 - End Row 3042 (11 edits)
August 10, 2026 6:21 PM: Start Row 3121 - End Row 3131 (11 edits)
August 10, 2026 4:51 PM: Start Row 3032 - End Row 3042 (11 edits)
August 10, 2026 3:30 PM: Start Row 1001 - End Row 1013 (13 edits)
August 10, 2026 3:30 PM: Start Row 1160 - End Row 1172 (13 edits)
August 10, 2026 12:28 PM: Start Row 784 - End Row 791 (8 edits)
August 10, 2026 12:28 PM: Start Row 784 - End Row 791 (8 edits)
August 10, 2026 12:28 PM: Start Row 933 - End Row 943 (11 edits)
August 10, 2026 11:14 AM: Start Row 3230 - End Row 3243 (14 edits)
August 9, 2026 7:51 PM: Start Row 2807 - End Row 2819 (13 edits)
July 30, 2026 9:24 PM: Start Row 2952 - End Row 2964 (13 edits)
July 30, 2026 6:15 PM: Start Row 2952 - End Row 2964 (13 edits)
July 29, 2026 1:22 PM: Start Row 738 - End Row 750 (13 edits)
July 28, 2026 6:05 PM: Start Row 715 - End Row 728 (14 edits)
July 28, 2026 1:14 PM: Start Row 2746 - End Row 2756 (11 edits)
July 27, 2026 5:41 PM: Start Row 2671 - End Row 2680 (10 edits)
July 26, 2026 3:10 PM: Start Row 1121 - End Row 1133 (13 edits)
July 25, 2026 7:45 PM: Start Row 1121 - End Row 1133 (13 edits)
July 24, 2026 6:19 PM: Start Row 2582 - End Row 2590 (9 edits)
July 23, 2026 4:32 PM: Start Row 2572 - End Row 2579 (8 edits)
July 22, 2026 8:10 PM: Start Row 1487 - End Row 1499 (13 edits)
July 21, 2026 2:45 PM: Start Row 1001 - End Row 1172 (172 edits)
July 20, 2026 7:18 PM: Start Row 1 - End Row 1370 (1370 edits)
July 18, 2026 8:52 PM: Start Row 812 - End Row 828 (17 edits)
July 17, 2026 3:32 PM: Start Row 956 - End Row 968 (13 edits)
July 17, 2026 11:20 AM: Start Row 1116 - End Row 1148 (33 edits)
July 16, 2026 5:23 PM: Start Row 956 - End Row 968 (13 edits)
July 16, 2026 3:50 PM: Start Row 789 - End Row 810 (22 edits)
July 16, 2026 11:57 AM: Start Row 789 - End Row 801 (13 edits)
July 15, 2026 7:43 PM: Start Row 789 - End Row 801 (13 edits)
July 15, 2026 1:23 PM: Start Row 789 - End Row 801 (13 edits)
July 15, 2026 12:31 PM: Start Row 566 - End Row 578 (13 edits)
July 14, 2026 6:45 PM: Start Row 566 - End Row 578 (13 edits)
July 14, 2026 5:12 PM: Start Row 566 - End Row 578 (13 edits)
July 14, 2026 2:52 PM: Start Row 566 - End Row 578 (13 edits)
July 14, 2026 1:16 PM: Start Row 566 - End Row 578 (13 edits)
July 13, 2026 11:05 PM: Start Row 472 - End Row 503 (32 edits)
July 13, 2026 6:33 PM: Start Row 472 - End Row 503 (32 edits)
July 13, 2026 12:53 PM: Start Row 472 - End Row 503 (32 edits)
July 13, 2026 11:28 AM: Start Row 368 - End Row 381 (14 edits)
July 12, 2026 5:17 PM: Start Row 368 - End Row 381 (14 edits)
July 12, 2026 4:39 PM: Start Row 368 - End Row 381 (14 edits)
July 12, 2026 2:11 PM: Start Row 368 - End Row 381 (14 edits)
July 11, 2026 4:59 PM: Start Row 212 - End Row 224 (13 edits)
July 11, 2026 1:42 PM: Start Row 212 - End Row 224 (13 edits)
July 11, 2026 12:08 PM: Start Row 212 - End Row 224 (13 edits)
July 10, 2026 7:47 PM: Start Row 212 - End Row 231 (20 edits)
July 10, 2026 5:59 PM: Start Row 212 - End Row 231 (20 edits)
July 10, 2026 4:38 PM: Start Row 212 - End Row 231 (20 edits)
July 10, 2026 1:27 PM: Start Row 2 - End Row 205 (204 edits)
July 10, 2026 1:24 PM: Start Row 2 - End Row 205 (204 edits)
July 10, 2026 11:30 AM: Start Row 2 - End Row 205 (204 edits)
```

---

## 5. Extractor Scripts & Reproducibility
- Master Total Script: `scratch/recalculate_master_totals_with_july.py`
- Deduplication Generator Script: `scratch/generate_unique_de_duplicated_edits.py`
- July 18-10 Frame Extractor Script: `scratch/deep_parse_1000014215.py`
