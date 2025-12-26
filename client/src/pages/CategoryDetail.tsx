import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { Calendar } from "lucide-react";
import { Link, useParams } from "wouter";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category, isLoading: categoryLoading } = trpc.categories.getBySlug.useQuery({ slug: slug || "" });
  const { data: blogs, isLoading: blogsLoading } = trpc.blogs.getByCategory.useQuery(
    { categoryId: category?.id || 0 },
    { enabled: !!category?.id }
  );

  if (categoryLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading category...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blogs">View All Articles</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.name}</h1>
              {category.description && (
                <p className="text-xl text-muted-foreground">{category.description}</p>
              )}
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            {blogsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
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
                <p className="text-muted-foreground mb-4">No articles found in this category yet.</p>
                <Button asChild>
                  <Link href="/blogs">View All Articles</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Expert Guidance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a consultation with our expert physiotherapists to get personalized advice and
              treatment for your specific condition.
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
