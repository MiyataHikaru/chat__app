module UsersHelper

  def user_image(user)
    if user.image
      image_tag "/user_images/#{user.image}", class: "user-image"
    else
      image_tag "hituji.png", class: "user-image"
    end
  end
end
