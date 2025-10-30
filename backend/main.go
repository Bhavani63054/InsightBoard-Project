package main

import (
    "log"
    "net/http"

    "insightboard/api"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/api/visualize", api.VisualizeHandler).Methods(http.MethodPost)

    handler := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"GET", "POST", "OPTIONS"},
        AllowedHeaders: []string{"*"},
    }).Handler(r)

    log.Println(" Backend running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
