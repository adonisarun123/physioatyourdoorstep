import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO, { generateBreadcrumbSchema } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Calendar } from "lucide-react";
import { Link } from "wouter";

export default function Blogs() {
  const { data: blogs, isLoading } = trpc.blogs.list.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();

  const structuredData = [
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://physioatyourdoorstep.com/' },
      { name: 'Blogs', url: 'https://physioatyourdoorstep.com/blogs' },
    ]),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Health & Wellness Blog | Physiotherapy Tips & Insights | Physio At Your Doorstep"
        description="Expert articles and insights on physiotherapy, rehabilitation, injury prevention, and wellness. Learn from professional physiotherapists."
        canonical="https://physioatyourdoorstep.com/blogs"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Health & Wellness Blog</h1>
              <p className="text-xl text-muted-foreground">
                Expert insights, tips, and information about physiotherapy, rehabilitation, and overall
                wellness
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <section className="py-8 border-b">
            <div className="container">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blogs">All Posts</Link>
                </Button>
                {categories.map((category) => (
                  <Button key={category.id} variant="outline" size="sm" asChild>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blogs Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading blog posts...</p>
              </div>
            ) : blogs && blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <CardDescription className="mb-4 line-clamp-3 flex-1">
                        {blog.excerpt || blog.metaDescription || "Read more about this topic..."}
                      </CardDescription>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/${blog.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No blog posts available yet.</p>
                <Button asChild>
                  <Link href="/contact-us">Contact Us</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have Questions About Your Health?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our expert physiotherapists are here to help. Book a consultation to discuss your
              specific needs and get personalized advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/booking">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
}
