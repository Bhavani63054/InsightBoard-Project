package api

import (
    "encoding/json"
    "errors"
    "net/http"
    "sort"

    "insightboard/models"
)

func validate(req *models.VisualizeRequest) error {
    if len(req.Data) == 0 {
        return errors.New("please enter at least one category")
    }
    if req.ChartType == "" {
        return errors.New("please select a chart type")
    }
    return nil
}

func VisualizeHandler(w http.ResponseWriter, r *http.Request) {
    var req models.VisualizeRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    if err := validate(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    keys := make([]string, 0, len(req.Data))
    for k := range req.Data {
        keys = append(keys, k)
    }
    sort.Strings(keys)

    labels := make([]string, 0, len(keys))
    values := make([]float64, 0, len(keys))
    for _, k := range keys {
        labels = append(labels, k)
        values = append(values, req.Data[k])
    }

    res := models.VisualizeResponse{Labels: labels, Values: values, ChartType: req.ChartType}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(res)
}
