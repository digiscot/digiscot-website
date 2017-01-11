module Jekyll
  module TitleLookupFilter
    def titleLookup(input)
      Liquid::Template.parse(input).render(@context)
    end
  end
end

Liquid::Template.register_filter(Jekyll::TitleLookupFilter)