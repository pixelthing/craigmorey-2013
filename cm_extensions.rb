class CmExtensions < Middleman::Extension
  def initialize(app, options_hash={}, &block)
    super
  end

  helpers do

    def nav_on(link_section,in_section)
      if link_section == in_section
        'on'
      end
    end

  end

end

::Middleman::Extensions.register(:cm_extensions, CmExtensions)