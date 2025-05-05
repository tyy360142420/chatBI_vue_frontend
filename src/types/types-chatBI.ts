export interface NoStreamChatBIResponse{
    sql:string;
    display_type:string;
    data:any[];
    columns:string[];
    thoughts?:string;
}

export enum DisplayType{
    DISPLAY_PIE_CHART="response_pie_chart",
    DISPLAY_LINE_CHART="response_line_chart",
    DISPLAY_BAR_CHART="response_bar_chart",
    DISPLAY_TABLE="response_table",
    DISPLAY_SCATTER_CHART="response_scatter_chart",
    DISPLAY_BUBBLE_CHART="response_bubble_chart",
    DISPLAY_BONUT_CHART="response_donut_chart",
    DISPLAY_AREA_CHART="response_area_chart",
    DISPLAY_HEATMAP="response_heatmap"
}

export enum DisplayTab{
    CHART_TAB="Chart",
    SQL_TAB="Sql"
}