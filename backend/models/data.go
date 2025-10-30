package models
type VisualizeRequest struct {
    Data      map[string]float64 `json:"data"`
    ChartType string             `json:"chartType"`
}

type VisualizeResponse struct {
    Labels    []string  `json:"labels"`
    Values    []float64 `json:"values"`
    ChartType string    `json:"chartType"`
}
