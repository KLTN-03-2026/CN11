"use client";

import ChefRestaurent from "@/components/ChefRestaurent";
import FeaturedDishes from "@/components/FeauterDished";
import FoodVideoSection from "@/components/FoodVideoSection";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import StatusRestaurent from "@/components/StatusRestaurent";
import dynamic from "next/dynamic";


const RestaurantIntro = dynamic(() => import("../components/RestaurentIntro"), {
  ssr: false
})

export default function Page() {

  return (
    <div>
      <Header />
      <RestaurantIntro />
      <StatusRestaurent />
      <FeaturedDishes />
      <FoodVideoSection />
      <ChefRestaurent />
      <Footer />
    </div>
  );
}
