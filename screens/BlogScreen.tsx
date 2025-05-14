import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import BottomNavigation from '../components/BottomNavigation';
import { RootStackParamList } from '../navigation/AppNavigator';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: any;
  date: string;
  readTime: string;
  category: string;
  content?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Modern Home Design Trends 2024',
    excerpt: 'Discover the latest trends in home design and architecture that are shaping modern living spaces.',
    image: require('../assets/services/Interior-Designer.jpeg'),
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    category: 'Design',
    content: `Modern home design in 2024 is all about blending functionality with aesthetics while embracing sustainability. Open floor plans continue to dominate, creating fluid spaces that promote family interaction and entertainment. Natural materials like wood, stone, and clay are being used in innovative ways, bringing warmth and texture to interiors.

Smart home technology has become seamlessly integrated, with voice-controlled systems managing everything from lighting and temperature to security. Energy efficiency is no longer optional but a core design principle, with solar panels, energy-efficient windows, and smart thermostats becoming standard features.

Color palettes are shifting towards earthy tones with occasional bold accents. Biophilic design elements—incorporating nature into living spaces—have gained significant traction, with living walls, abundant natural light, and indoor gardens appearing in homes of all sizes.

Multifunctional spaces have become essential, with home offices, workout areas, and entertainment zones cleverly incorporated into residential designs. Furniture is increasingly modular and adaptable, allowing spaces to transform based on immediate needs.

Outdoor living areas are now extensions of indoor spaces, with covered patios, outdoor kitchens, and comfortable seating areas blurring the lines between inside and outside. Personalization is key, with unique architectural elements and custom features making each home distinct.`
  },
  {
    id: '2',
    title: 'Essential Tools for Home Renovation',
    excerpt: 'A comprehensive guide to the must-have tools for your next home renovation project.',
    image: require('../assets/services/carpenter.png'),
    date: 'Mar 14, 2024',
    readTime: '4 min read',
    category: 'DIY',
    content: `When embarking on a home renovation project, having the right tools is crucial for efficiency, precision, and safety. Whether you're a DIY enthusiast or a first-time renovator, this guide will help you assemble the essential toolkit for successful home improvements.

First and foremost, invest in quality measuring tools. A tape measure, carpenter's square, and level are indispensable for accurate measurements and straight lines. Digital laser measures can be worth the investment for larger projects, providing instant and precise distance calculations.

Power tools form the backbone of any renovation toolkit. A drill/driver is perhaps the most versatile, handling everything from hanging pictures to assembling furniture. Consider a combo kit with both a drill and impact driver for maximum versatility. A circular saw is essential for straight cuts in wood and other materials, while a jigsaw excels at curved cuts and detailed work.

Hand tools remain irreplaceable despite technological advances. A claw hammer, screwdriver set with multiple bits, pliers, and utility knife should be readily accessible. A pry bar is invaluable for removing trim, molding, and nails.

For wall work, drywall tools like a putty knife, taping knife, and sander are necessary. A stud finder helps locate secure mounting points, and a good set of paintbrushes and rollers ensures professional-looking finishes.

Safety equipment is non-negotiable. Safety glasses, work gloves, ear protection, and a dust mask or respirator protect you during the renovation process. A first aid kit should always be easily accessible.

Organization tools like tool belts, storage boxes, and workshop organizers keep your workspace efficient and prevent lost or damaged tools. Finally, specialized tools for plumbing, electrical work, or flooring may be required depending on your specific project.

Remember, quality matters with tools. While professional-grade equipment isn't always necessary for homeowners, extremely cheap tools can lead to frustration, poor results, and potential safety hazards. Invest wisely in tools you'll use repeatedly, and consider renting specialty tools for one-time projects.`
  },
  {
    id: '3',
    title: 'Sustainable Building Materials',
    excerpt: 'Explore eco-friendly building materials that are both sustainable and stylish.',
    image: require('../assets/services/Solar-Panel.png'),
    date: 'Mar 13, 2024',
    readTime: '6 min read',
    category: 'Sustainability',
    content: `Sustainable building materials are revolutionizing the construction industry, offering environmentally friendly alternatives that don't compromise on performance or aesthetics. As climate concerns grow, these materials are becoming increasingly mainstream, appearing in both residential and commercial projects worldwide.

Bamboo leads the charge among renewable resources. With a growth rate far exceeding traditional timber and impressive tensile strength, bamboo is ideal for flooring, cabinetry, and even structural elements. Its natural beauty eliminates the need for chemical treatments, further enhancing its eco-credentials.

Reclaimed wood salvaged from old buildings, barns, and factories gives historical materials new life while preventing further deforestation. Each piece carries unique character and patina that new materials simply can't replicate, adding warmth and story to modern spaces.

Cork, harvested from the bark of cork oak trees without harming them, offers excellent insulation properties while being naturally fire-resistant and antimicrobial. It's finding applications beyond wine bottles in flooring, wall coverings, and insulation.

Recycled metal, particularly aluminum and steel, requires significantly less energy to repurpose than producing new material. These metals provide durability and modern aesthetics while diverting waste from landfills.

Hempcrete, a biocomposite made from hemp hurds and lime, creates lightweight yet durable building materials with exceptional insulating properties. It naturally regulates humidity and continues to absorb carbon throughout its lifetime.

Other notable sustainable materials include rammed earth, which uses compressed natural raw materials for walls with thermal mass benefits; mycelium composites grown from mushroom roots to create insulation and packaging; and recycled glass and plastic transformed into countertops, tiles, and insulation.

Beyond their environmental benefits, many sustainable materials offer health advantages by eliminating the volatile organic compounds (VOCs) and chemical treatments common in conventional building materials. This creates healthier indoor environments with improved air quality.

As consumer demand grows and production scales up, these once-premium materials are becoming increasingly cost-competitive with conventional options, making sustainable building accessible to more projects. The result is construction that not only reduces environmental impact but often creates more beautiful, healthy, and character-rich spaces.`
  },
  {
    id: '4',
    title: 'Electrical Safety at Home',
    excerpt: 'Learn about essential electrical safety tips to protect your home and family.',
    image: require('../assets/services/electrician.png'),
    date: 'Mar 12, 2024',
    readTime: '5 min read',
    category: 'Safety',
    content: `Electrical safety at home is paramount yet often overlooked until problems arise. Implementing basic safety practices can prevent dangerous situations, protect your property, and potentially save lives.

Regular inspection of electrical cords, plugs, and outlets is a simple but effective practice. Look for fraying, cracking, or other damage on cords, and replace them immediately if compromised. Outlets should be cool to the touch; warmth may indicate dangerous wiring issues requiring professional attention.

Avoid overloading circuits, particularly with high-wattage appliances. Spread major appliances across different outlets and circuits when possible. Extension cords should be temporary solutions only, not permanent fixtures. When needed, use appropriate heavy-duty cords for large appliances and ensure they're not pinched by furniture or run under carpets where heat can build up.

Water and electricity create a lethal combination. Install GFCI (Ground Fault Circuit Interrupter) outlets in kitchens, bathrooms, laundry rooms, and outdoor areas. These specialized outlets cut power instantly when detecting current leakage, preventing severe shocks.

Childproofing is essential in homes with young children. Use outlet covers for unused outlets and cord covers to prevent children from chewing on or playing with electrical cords. Teach children early about electrical dangers in age-appropriate ways.

Surge protectors shield sensitive electronics from voltage spikes that can damage equipment and potentially cause fires. Consider whole-house surge protection for comprehensive coverage.

Knowing your electrical panel is crucial for emergencies. Ensure it's properly labeled so specific circuits can be quickly identified and turned off when necessary. Everyone in the household should know where the main shut-off is located.

Schedule professional electrical inspections, especially in homes over 25 years old or when purchasing a new property. Modern appliances often demand more power than older electrical systems were designed to handle.

Working with electricity requires proper knowledge and tools. Unless you have appropriate training, leave electrical repairs and installations to licensed electricians. The cost of professional service is minimal compared to the risks of improper DIY electrical work.

Finally, have working smoke detectors on every level of your home, especially near sleeping areas, and test them monthly. Consider installing additional specialized detectors that can identify electrical fires specifically.

By implementing these safety practices, you create layers of protection that significantly reduce electrical hazards in your home.`
  },
  {
    id: '5',
    title: 'Professional Painting Tips',
    excerpt: 'Expert tips and techniques for achieving a professional paint finish in your home.',
    image: require('../assets/services/Professional-Painter.png'),
    date: 'Mar 11, 2024',
    readTime: '4 min read',
    category: 'DIY',
    content: `Achieving a professional-quality paint finish in your home isn't just about the color—it's about technique, preparation, and using the right tools. Professional painters develop their expertise through years of experience, but with these insider tips, you can dramatically improve your painting results.

Preparation is where professionals spend the most time, and for good reason. Thoroughly clean walls with a mild detergent solution to remove dirt, oils, and residues that can prevent proper paint adhesion. Fill holes and cracks with appropriate patching compounds, and sand these areas smooth once dry. Remove switch plates, outlet covers, and hardware rather than painting around them.

Invest in high-quality painter's tape for clean edges, pressing firmly along the edges to prevent bleed-through. Drop cloths protect floors and furniture—canvas options stay in place better than plastic sheets, which can be slippery underfoot.

Priming is often skipped by DIYers but is essential for a professional finish. Primers ensure uniform paint absorption, increase durability, and provide better coverage, particularly when making dramatic color changes or painting new drywall. Self-priming paints can work for minor updates, but separate primers are best for significant projects.

Professional painters know the value of premium tools. High-quality brushes and rollers apply paint more evenly and shed fewer fibers. Natural-bristle brushes work best with oil-based paints, while synthetic brushes are ideal for water-based formulations. Microfiber rollers create minimal texture and superior coverage compared to cheaper alternatives.

The painting technique itself significantly impacts the final result. Load brushes properly, dipping only about a third of the bristle length and tapping (not wiping) against the container to remove excess. When cutting in along edges and trim, pull the brush in a smooth, continuous motion rather than using short strokes.

For rolling walls, use the "W" technique—rolling paint on in a large W pattern, then filling in without lifting the roller. This prevents lap marks and ensures even coverage. Apply moderate pressure; pushing too hard causes splatter and uneven application.

Work from top to bottom, moving from dry areas into wet ones to blend seamlessly. Complete entire wall sections at once rather than stopping mid-wall, which can create visible lines in the finished product.

Multiple thin coats always yield better results than a single thick application, which can drip, sag, and take excessively long to dry. Allow proper drying time between coats according to the manufacturer's instructions—rushing this process compromises the finish.

Finally, professionals know that proper cleanup extends the life of expensive tools. Thoroughly clean brushes and rollers immediately after use, reshaping brush bristles and storing them properly for future projects.

With these professional techniques, even inexperienced painters can achieve impressive, long-lasting results that transform their living spaces.`
  }
];

const { width } = Dimensions.get('window');
const numColumns = width > 768 ? 2 : 1; // Use 2 columns on larger devices
const cardWidth = numColumns === 1 ? width - 32 : (width - 48) / 2; // Account for margins

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const handleBlogPress = () => {
    navigation.navigate('BlogDetail', { post });
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.blogCard,
        { 
          backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
          width: cardWidth
        }
      ]}
      onPress={handleBlogPress}
    >
      <Image source={post.image} style={styles.blogImage} />
      <View style={styles.blogContent}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{post.category}</Text>
        </View>
        <Text style={[
          styles.blogTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          {post.title}
        </Text>
        <Text style={[
          styles.blogExcerpt,
          { color: isDarkMode ? '#CCCCCC' : '#666666' }
        ]} numberOfLines={3}>
          {post.excerpt}
        </Text>
        <View style={styles.blogMeta}>
          <Text style={[
            styles.metaText,
            { color: isDarkMode ? '#999999' : '#666666' }
          ]}>
            {post.date}
          </Text>
          <Text style={[
            styles.metaText,
            { color: isDarkMode ? '#999999' : '#666666' }
          ]}>
            • {post.readTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function BlogScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerBanner}>
          <Text style={styles.bannerText}>Latest Articles</Text>
          <Text style={styles.bannerSubtext}>Home improvement tips and insights</Text>
        </View>
        
        <View style={styles.blogGrid}>
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerBanner: {
    marginBottom: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A86B',
    marginBottom: 8,
  },
  bannerSubtext: {
    fontSize: 16,
    color: '#666666',
  },
  blogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: numColumns === 1 ? 'center' : 'space-between',
  },
  blogCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  blogImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  blogContent: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    color: '#00A86B',
    fontSize: 14,
    fontWeight: '600',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  blogExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginRight: 8,
  },
}); 