<style>
    .job-summary-wrap {
        font-family: Arial, Helvetica, sans-serif;
        color: #1a1a1a;
        background: #fff;
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
    }

    .job-summary-wrap * {
        box-sizing: border-box;
    }

    .js-navy {
        background-color: #2d4d8f;
        color: #fff;
    }

    .js-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #d0d0d0;
        border-bottom: 3px solid #2d4d8f;
        padding: 14px 18px;
        margin-bottom: 4px;
    }

    .js-header .js-logo img {
        height: 70px;
    }

    .js-header .js-title-block {
        text-align: right;
    }

    .js-header .js-title-block .js-title {
        font-size: 20px;
        font-weight: 700;
        color: #2d4d8f;
    }

    .js-header .js-title-block .js-meta {
        font-size: 12px;
        color: #555;
        margin-top: 2px;
    }

    .js-doc-title {
        font-size: 13px;
        font-weight: 700;
        margin: 10px 2px 14px;
        color: #333;
    }

    .js-columns {
        display: flex;
        gap: 14px;
        margin-bottom: 14px;
    }

    .js-box {
        flex: 1;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        overflow: hidden;
    }

    .js-box-header {
        font-size: 13px;
        font-weight: 700;
        padding: 8px 12px;
        letter-spacing: .3px;
    }

    .js-box-body table {
        width: 100%;
        border-collapse: collapse;
    }

    .js-box-body table td {
        padding: 7px 12px;
        font-size: 12.5px;
        vertical-align: top;
        border-bottom: 1px solid #eee;
    }

    .js-box-body table tr:last-child td {
        border-bottom: none;
    }

    .js-box-body table td:first-child {
        font-weight: 700;
        width: 42%;
        color: #333;
    }

    .js-total-bar {
        width: calc(50% - 7px);
        margin-left: auto;
        text-align: right;
        padding: 10px 16px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 14px;
    }

    .js-badge {
        display: inline-block;
        padding: 3px 12px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        background: #fff;
        color: #2d4d8f;
    }

    .js-section-title {
        font-size: 13px;
        font-weight: 700;
        padding: 8px 12px;
        margin-bottom: 10px;
        letter-spacing: .3px;
    }

    .js-visit-block {
        border: 1px solid #d0d0d0;
        border-radius: 2px;
        margin-bottom: 16px;
    }

    .js-visit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 14px;
        font-size: 13px;
        font-weight: 700;
    }

    .js-visit-fields {
        display: flex;
        gap: 0;
    }

    .js-visit-fields > div {
        flex: 1;
    }

    .js-visit-fields table {
        width: 100%;
        border-collapse: collapse;
    }

    .js-visit-fields td {
        padding: 7px 14px;
        font-size: 12.5px;
        vertical-align: top;
        border-bottom: 1px solid #eee;
    }

    .js-visit-fields tr:last-child td {
        border-bottom: none;
    }

    .js-visit-fields td:first-child {
        font-weight: 700;
        width: 42%;
        color: #333;
    }

    .js-visit-fields > div:first-child {
        border-right: 1px solid #eee;
    }

    .js-table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 4px;
    }

    .js-table th, .js-table td {
        border: 1px solid #d0d0d0;
        padding: 7px 10px;
        font-size: 12px;
        text-align: left;
    }

    .js-table th {
        background: #e0e8f0;
        font-weight: 700;
    }

    .js-table td.js-num, .js-table th.js-num {
        text-align: right;
    }

    .js-table tr.js-total-row td {
        border: none;
        font-weight: 700;
    }

    .js-table tr.js-total-row td.js-total-label {
        border-right: 1px solid #d0d0d0;
        text-align: right;
    }

    .js-doc-table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 4px;
    }

    .js-doc-table th, .js-doc-table td {
        border: 1px solid #d0d0d0;
        padding: 7px 10px;
        font-size: 12px;
        text-align: left;
    }

    .js-doc-table th {
        background: #e0e8f0;
        font-weight: 700;
    }

    .js-doc-thumb {
        max-width: 220px;
        max-height: 220px;
        display: block;
        border: 1px solid #d0d0d0;
        border-radius: 2px;
    }

    .js-empty {
        padding: 14px;
        font-size: 12.5px;
        color: #888;
        font-style: italic;
    }

    @media print {
        body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        .js-visit-block {
            page-break-inside: avoid;
        }
    }
</style>
