import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { SocialProof } from '../components/home/SocialProof';
import { Categories } from '../components/home/Categories';
import { ProductSliders } from '../components/home/ProductSliders';
import { Benefits } from '../components/home/Benefits';
import { FeaturedProduct } from '../components/home/FeaturedProduct';
import { TrustAndCompare } from '../components/home/TrustAndCompare';
import { OfferAndFAQ } from '../components/home/OfferAndFAQ';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] overflow-x-hidden">
      <Header />
      <main className="flex-grow pt-8">
        <Hero />
        <SocialProof />
        <Categories />
        <ProductSliders />
        <Benefits />
        <FeaturedProduct />
        <TrustAndCompare />
        <OfferAndFAQ />
      </main>
      <Footer />
    </div>
  );
}
