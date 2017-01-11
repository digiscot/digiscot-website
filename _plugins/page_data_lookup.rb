module Jekyll
  class PageDataLookup < Jekyll::Generator
    def generate(site)
      site.data['pages'] = {}
      site.pages.each do |page|
        key = page.url
        site.data['pages'][key] = {
          'title' => page['title'],
          'menu-title' => page['menu-title'] || page['title'],
          'excerpt' => page['excerpt'],
          'icon' => page['icon'],
          'fa-icon' => page['fa-icon'],
          'category' => page['category']
        }
      end
    end
  end
end