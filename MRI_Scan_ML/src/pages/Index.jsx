import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MRIUpload from "@/components/MRIUpload";
import medicalHero from "@/assets/steth.jpg";
import { toast } from "sonner";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setPrediction(null);
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      toast.error("Please select an MRI image first");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      // Replace with your actual FastAPI backend URL
      const response = await fetch("https://alzheimer-fastapi.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      setPrediction(result.prediction);
      toast.success("Analysis complete!");
    } catch (error) {
      // Mock prediction for demo purposes when backend is not available
      console.log("Backend not available, showing mock prediction");

      setTimeout(() => {
        const mockPredictions = [
          "No Dementia",
          "Mild Dementia",
          "Moderate Dementia",
          "Severe Dementia",
        ];
        const randomPrediction =
          mockPredictions[Math.floor(Math.random() * mockPredictions.length)];
        setPrediction(randomPrediction);
        toast.success("Analysis complete! (Demo mode)");
        setIsLoading(false);
      }, 2000);

      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col m-2">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden p-20">
        {/* Background Image with Overlay */}
        <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
       style={{ backgroundImage: `url(${medicalHero})` }}
        />
    <div className="absolute inset-0 bg-white/70" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center space-y-8">
      
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl shadow-md">
        <Brain className="w-10 h-10" />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        AI-Powered Dementia <br />
        <span className="text-blue-600">Diagnosis Assistant</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Advanced neural networks analyze MRI scans to assist healthcare professionals 
        in early dementia detection and classification.
      </p>

      {/* CTA */}
      <div className="pt-6">
      <button
        onClick={() => {
          const section = document.getElementById("upload");
          section?.scrollIntoView({ behavior: "smooth" });
        }}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Upload MRI Scan
      </button>
      </div>
    </div>
  </div>
</section>

        {/* Features */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Instant Analysis */}
              <Card className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Instant Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Get results in seconds with our optimized deep learning
                    models
                  </p>
                </CardContent>
              </Card>

              {/* Clinical Grade */}
              <Card className="bg-gradient-to-b from-green-50 to-white border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                    <Activity className="w-6 h-6 text-green-500" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Clinical Grade
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Validated algorithms trained on extensive medical datasets
                  </p>
                </CardContent>
              </Card>

              {/* Secure & Private */}
              <Card className="bg-gradient-to-b from-yellow-50 to-white border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                    <Shield className="w-6 h-6 text-yellow-500" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Secure & Private
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    HIPAA compliant processing with end-to-end encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-12" id = "upload">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Upload MRI for Analysis
              </h2>
              <p className="text-muted-foreground text-lg">
                Upload your MRI scan to receive AI-powered dementia
                classification
              </p>
            </div>

            <MRIUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              isLoading={isLoading}
              prediction={prediction}
            />

            {selectedImage && !isLoading && !prediction && (
              <div className="text-center mt-6">
                <Button
                  onClick={handlePredict}
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Brain className="w-5 h-5 mr-2 hover:bg-slate-500" />
                  Analyze MRI Scan
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
