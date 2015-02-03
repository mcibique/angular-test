http_path = "/"
css_dir = ".tmp/styles"
generated_images_dir = ".tmp/images"
sass_dir = "src/styles"
images_dir = "src/images"
javascripts_dir = "src/scripts"
fonts_dir = "src/fonts"
http_images_path = "/images"
http_fonts_path = "/fonts"
http_generated_images_path = "/images"
relative_assets = false
asset_cache_buster = false
line_comments = false

# http://stackoverflow.com/questions/14173242/remove-the-random-string-appended-to-sprite-filename-with-compass-sass
module Compass::SassExtensions::Functions::Sprites
  def sprite_url(map)
    verify_map(map, "sprite-url")
    map.generate
    generated_image_url(Sass::Script::String.new(map.name_and_hash))
  end
end

module Compass::SassExtensions::Sprites::SpriteMethods
  def name_and_hash
    "#{path}.png"
  end

  def cleanup_old_sprites
    Dir[File.join(::Compass.configuration.generated_images_path, "#{path}.png")].each do |file|
      log :remove, file
      FileUtils.rm file
      ::Compass.configuration.run_sprite_removed(file)
    end
  end
end

module Compass
  class << SpriteImporter
    def find_all_sprite_map_files(path)
      glob = "*{#{self::VALID_EXTENSIONS.join(",")}}"
      Dir.glob(File.join(path, "**", glob))
    end
  end
end