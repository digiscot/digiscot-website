module Jekyll
  class PageDataLookup < Jekyll::Generator
    def generate(site)
      site.data['pages'] = {}
      site.pages.each do |page|
        key = page.url
        site.data['pages'][key] = {
          'title' => page['title'],
          'excerpt' => page['excerpt'],
          'icon' => page['icon'],
          'faicon' => page['fa-icon'],
          'category' => page['category']
        }
      end
    end
  end
end